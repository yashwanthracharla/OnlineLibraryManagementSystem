from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters

from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.password_validation import validate_password
from rest_framework import status

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "date_joined": user.date_joined,
        })


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        user.first_name = request.data.get("first_name", user.first_name)
        user.last_name = request.data.get("last_name", user.last_name)
        user.email = request.data.get("email", user.email)

        user.save()

        return Response({
            "message": "Profile updated successfully."
        })


class UserListView(generics.ListAPIView):

    queryset = User.objects.all().order_by("id")

    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]

    filter_backends = [filters.SearchFilter]

    search_fields = [
        "username",
        "email",
    ]


class UserDeleteView(generics.DestroyAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):

        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response(
                {"error": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password(new_password, user)
        except Exception as e:
            return Response(
                {"error": list(e.messages)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response({
            "message": "Password changed successfully."
        })