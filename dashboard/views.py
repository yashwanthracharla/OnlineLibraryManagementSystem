from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from books.models import Book
from borrow.models import BorrowRecord
from reviews.models import Review


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        today = timezone.now().date()

        # ==========================
        # ADMIN DASHBOARD
        # ==========================
        if user.is_staff:

            borrowed_books = BorrowRecord.objects.filter(
                is_returned=False
            )

            overdue_books = [
                record
                for record in borrowed_books
                if record.calculate_fine() > 0
            ]

            total_fine = sum(
                record.calculate_fine()
                for record in borrowed_books
            )

            # Borrow chart (last 6 months)
            monthly = (
                BorrowRecord.objects
                .extra(select={"month": "MONTH(borrow_date)"})
                .values("month")
                .annotate(total=Count("id"))
                .order_by("month")
            )

            months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]

            labels = []
            values = []

            for item in monthly:
                labels.append(months[item["month"] - 1])
                values.append(item["total"])

            recent = []

            for borrow in BorrowRecord.objects.select_related(
                "book",
                "user"
            ).order_by("-borrow_date")[:5]:

                recent.append({

                    "book": borrow.book.title,

                    "user": borrow.user.username,

                    "borrow_date": borrow.borrow_date,

                    "status": (
                        "Returned"
                        if borrow.is_returned
                        else "Borrowed"
                    ),

                })

            return Response({

                "total_books": Book.objects.count(),

                "available_books": Book.objects.aggregate(
                    total=Sum("available_copies")
                )["total"] or 0,

                "borrowed_books": borrowed_books.count(),

                "total_users": User.objects.count(),

                "overdue_books": len(overdue_books),

                "total_fine": total_fine,

                "borrowed_today": BorrowRecord.objects.filter(
                    borrow_date=today
                ).count(),

                "returned_today": BorrowRecord.objects.filter(
                    return_date=today
                ).count(),

                "chart": {

                    "labels": labels,

                    "values": values,

                },

                "recent": recent,

            })

        # ==========================
        # USER DASHBOARD
        # ==========================

        active = BorrowRecord.objects.filter(
            user=user,
            is_returned=False,
        )

        history = BorrowRecord.objects.filter(
            user=user
        )

        reviews = Review.objects.filter(
            user=user
        )

        current_books = []

        for record in active.select_related("book"):

            current_books.append({

                "id": record.book.id,

                "title": record.book.title,

                "cover_image": record.book.cover_image.url
                if record.book.cover_image
                else None,

                "borrow_date": record.borrow_date,

                "due_date": record.due_date,

            })

        recent_reviews = []

        for review in reviews.select_related("book").order_by("-created_at")[:5]:

            recent_reviews.append({

                "book": review.book.title,

                "rating": review.rating,

                "review": review.review,

                "created_at": review.created_at,

            })

        fine = sum(
            record.calculate_fine()
            for record in active
        )

        return Response({

            "my_books": history.count(),

            "currently_borrowed": active.count(),

            "my_reviews": reviews.count(),

            "my_fine": fine,

            "current_books": current_books,

            "recent_reviews": recent_reviews,

        })