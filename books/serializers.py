from rest_framework import serializers
from django.db.models import Avg

from .models import Book
from reviews.models import Review


class BookSerializer(serializers.ModelSerializer):

    average_rating = serializers.SerializerMethodField()

    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "author",
            "isbn",
            "category",
            "publisher",
            "published_date",
            "description",
            "total_copies",
            "available_copies",
            "cover_image",
            "created_at",
            "updated_at",
            "average_rating",
            "review_count",
        ]

    def get_average_rating(self, obj):

        average = Review.objects.filter(
            book=obj
        ).aggregate(
            Avg("rating")
        )["rating__avg"]

        return round(average, 1) if average else 0

    def get_review_count(self, obj):

        return Review.objects.filter(
            book=obj
        ).count()