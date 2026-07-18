from django.db import models
from django.contrib.auth.models import User
from books.models import Book
from datetime import timedelta
from django.utils import timezone


class BorrowRecord(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    borrow_date = models.DateField(auto_now_add=True)

    due_date = models.DateField(blank=True, null=True)

    return_date = models.DateField(blank=True, null=True)

    is_returned = models.BooleanField(default=False)

    fine = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0
    )

    def save(self, *args, **kwargs):

        if not self.due_date:
            self.due_date = self.borrow_date + timedelta(days=14)

        super().save(*args, **kwargs)

    def calculate_fine(self):
        today = timezone.now().date()

        # If returned, calculate until return date
        
        end_date = self.return_date if self.is_returned else today

        if end_date <= self.due_date:

            return 0
        
        late_days = (end_date - self.due_date).days

        return late_days * 10


    def __str__(self):
        return f"{self.user.username} - {self.book.title}"