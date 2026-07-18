from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.views import TokenObtainPairView

from borrow.models import BorrowRecord
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer


# ---------------- Register ---------------- #

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# ---------------- Login ---------------- #

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ---------------- Current User ---------------- #

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
        })


# ---------------- User List ---------------- #

class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        search = request.GET.get("search", "")

        users = User.objects.all().order_by("id")

        if search:
            users = users.filter(
                username__icontains=search
            ) | User.objects.filter(
                email__icontains=search
            )

        data = []

        for user in users:

            borrows = BorrowRecord.objects.filter(user=user)

            active = borrows.filter(is_returned=False)

            borrowed_titles = [
                borrow.book.title
                for borrow in active
            ]

            total_fine = sum(float(borrow.fine) for borrow in borrows)

            data.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "joined": user.date_joined.strftime("%d-%m-%Y"),
                "total_borrowed": borrows.count(),
                "borrowed_books": borrowed_titles,
                "fine": total_fine,
            })

        return Response({
            "results": data
        })


# ---------------- Delete User ---------------- #

class UserDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):

        user = get_object_or_404(User, pk=pk)

        if user == request.user:
            return Response(
                {
                    "message": "You cannot delete yourself."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.delete()

        return Response({
            "message": "User deleted successfully."
        })


# ---------------- User Details ---------------- #

class UserDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):

        user = get_object_or_404(User, pk=pk)

        borrows = BorrowRecord.objects.filter(
            user=user
        ).select_related("book")

        books = []

        total_fine = 0

        for borrow in borrows:

            total_fine += float(borrow.fine)

            books.append({
                "title": borrow.book.title,
                "borrow_date": borrow.borrow_date,
                "due_date": borrow.due_date,
                "return_date": borrow.return_date,
                "status": "Returned" if borrow.is_returned else "Borrowed",
                "fine": borrow.fine,
            })

        return Response({

            "id": user.id,

            "username": user.username,

            "email": user.email,

            "joined": user.date_joined.strftime("%d-%m-%Y"),

            "total_borrowed": borrows.count(),

            "active_books": borrows.filter(
                is_returned=False
            ).count(),

            "total_fine": total_fine,

            "books": books,

        })


# ---------------- Borrow Details ---------------- #

class UserBorrowDetailsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):

        borrows = BorrowRecord.objects.filter(
            user_id=pk
        ).select_related("book")

        data = []

        for borrow in borrows:

            data.append({
                "book": borrow.book.title,
                "borrow_date": borrow.borrow_date,
                "due_date": borrow.due_date,
                "returned": borrow.is_returned,
                "fine": borrow.fine,
            })

        return Response(data)