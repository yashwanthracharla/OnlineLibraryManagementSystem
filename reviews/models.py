from django.db import models
from django.contrib.auth.models import User
from books.models import Book


class Review(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews"
    )

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="reviews"
    )

    rating = models.PositiveSmallIntegerField()

    review = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:

        unique_together = ("user", "book")

        ordering = ["-created_at"]

    def __str__(self):

        return f"{self.user.username} - {self.book.title}"