from django.contrib import admin
from .models import BorrowRecord


@admin.register(BorrowRecord)
class BorrowRecordAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "book",
        "borrow_date",
        "due_date",
        "is_returned",
        "fine",
    )

    list_filter = (
        "is_returned",
        "borrow_date",
    )

    search_fields = (
        "user__username",
        "book__title",
    )