from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from books.models import Book
from borrow.models import BorrowRecord

from .models import Review
from .serializers import ReviewSerializer


class BookReviewListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, book_id):

        reviews = Review.objects.filter(book_id=book_id)

        serializer = ReviewSerializer(reviews, many=True)

        average = 0

        if reviews.exists():
            average = round(
                sum(r.rating for r in reviews) / reviews.count(),
                1
            )

        return Response({
            "average_rating": average,
            "total_reviews": reviews.count(),
            "reviews": serializer.data,
        })

    def post(self, request, book_id):

        if not request.user.is_authenticated:
            return Response(
                {"message": "Login required."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        book = get_object_or_404(Book, pk=book_id)

        borrowed = BorrowRecord.objects.filter(
            user=request.user,
            book=book,
            is_returned=True,
        ).exists()

        if not borrowed:
            return Response(
                {
                    "message":
                    "You can review only books you have returned."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        review = Review.objects.filter(
            user=request.user,
            book=book
        ).first()

        if review:

            serializer = ReviewSerializer(
                review,
                data=request.data,
                partial=True,

            )

        else:

            serializer = ReviewSerializer(data=request.data)

        

        if serializer.is_valid():

            serializer.save(
                user=request.user,
                book=book,
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class ReviewDeleteView(generics.DestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAdminUser]