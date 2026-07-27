from django.contrib.auth.models import User
from rest_framework import serializers

from borrow.models import BorrowRecord
from reviews.models import Review
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    borrowed_books = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    joined = serializers.DateTimeField(
        source="date_joined",
        format="%d %b %Y",
        read_only=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "email",
            "avatar",
            "borrowed_books",
            "reviews",
            "joined",
            "is_staff",
        ]

    def get_full_name(self, obj):

        if obj.first_name or obj.last_name:
            return f"{obj.first_name} {obj.last_name}".strip()

        return obj.username

    def get_avatar(self, obj):

        profile, _ = UserProfile.objects.get_or_create(
            user=obj
        )

        if profile.avatar:
            return profile.avatar.url

        return None

    def get_borrowed_books(self, obj):

        return BorrowRecord.objects.filter(
            user=obj
        ).count()

    def get_reviews(self, obj):

        return Review.objects.filter(
            user=obj
        ).count()