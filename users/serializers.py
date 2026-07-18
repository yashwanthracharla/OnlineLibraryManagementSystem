from django.contrib.auth.models import User
from rest_framework import serializers
from borrow.models import BorrowRecord


class UserSerializer(serializers.ModelSerializer):

    borrowed_books = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "date_joined",
            "borrowed_books",
        ]

    def get_borrowed_books(self, obj):
        return BorrowRecord.objects.filter(
            user=obj,
            is_returned=False
        ).count()