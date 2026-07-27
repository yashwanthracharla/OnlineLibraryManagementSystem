from rest_framework import serializers
from .models import Review
from users.models import UserProfile


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    review_date = serializers.DateTimeField(
        source="created_at",
        format="%d %b %Y",
        read_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "book",
            "rating",
            "review",
            "username",
            "avatar",
            "review_date",
        ]

    def get_username(self, obj):

        if obj.user.first_name:

            return (
                f"{obj.user.first_name} {obj.user.last_name}"
            ).strip()

        return obj.user.username

    def get_avatar(self, obj):

        profile, _ = UserProfile.objects.get_or_create(
            user=obj.user
        )

        if profile.avatar:
            return profile.avatar.url

        return None