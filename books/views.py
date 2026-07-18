from datetime import timedelta

from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Book
from .serializers import BookSerializer
from borrow.models import BorrowRecord


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all().order_by("title")
    serializer_class = BookSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = ["category"]

    search_fields = [
        "title",
        "author",
    ]

    ordering_fields = [
        "title",
        "author",
        "published_date",
    ]

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class BorrowBookView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        book = get_object_or_404(Book, pk=pk)

        overdue_books = BorrowRecord.objects.filter(
            user=request.user,
            is_returned=False
        )

        for record in overdue_books:

            if record.calculate_fine() > 0:

                return Response(
                    {
                        "message": "Return your overdue books before borrowing another."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
                 

        if book.available_copies <= 0:
            return Response(
                {"message": "Book is not available."},
                status=status.HTTP_400_BAD_REQUEST
            )

        already = BorrowRecord.objects.filter(
            user=request.user,
            book=book,
            is_returned=False
        ).exists()

        if already:
            return Response(
                {"message": "You already borrowed this book."},
                status=status.HTTP_400_BAD_REQUEST
            )

        BorrowRecord.objects.create(
            user=request.user,
            book=book,
            due_date=timezone.now().date() + timedelta(days=14),
        )

        book.available_copies -= 1
        book.save()

        return Response(
            {"message": "Book borrowed successfully."},
            status=status.HTTP_201_CREATED
        )
    
class ReturnBookView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        book = get_object_or_404(Book, pk=pk)

        borrow = BorrowRecord.objects.filter(
            user=request.user,
            book=book,
            is_returned=False,
        ).first()

        if not borrow:
            return Response(
                {"message": "No active borrow record found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        borrow.return_date = timezone.now().date()
        borrow.is_returned = True

        # calculate fine
        borrow.fine = borrow.calculate_fine()

        borrow.save()

        # increase available copies
        book.available_copies += 1
        book.save()

        return Response(
            {
                "message": "Book returned successfully.",
                "fine": borrow.fine,
            },
            status=status.HTTP_200_OK,
        )