from rest_framework import serializers
from django.utils import timezone
from .models import BorrowRecord


class BorrowRecordSerializer(serializers.ModelSerializer):

    book_title = serializers.CharField(source="book.title", read_only=True)
    cover_image = serializers.ImageField(source="book.cover_image", read_only=True)

    status = serializers.SerializerMethodField()
    current_fine = serializers.SerializerMethodField()

    class Meta:
        model = BorrowRecord
        fields = [
            "id",
            "book",
            "book_title",
            "cover_image",
            "borrow_date",
            "due_date",
            "return_date",
            "status",
            "current_fine",
        ]

    def get_status(self, obj):

        if obj.is_returned:
            return "Returned"

        if timezone.now().date() > obj.due_date:
            return "Overdue"

        return "Borrowed"

    def get_current_fine(self, obj):
        return obj.calculate_fine()