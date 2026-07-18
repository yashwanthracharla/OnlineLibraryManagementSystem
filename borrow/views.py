from rest_framework import generics, permissions
from .models import BorrowRecord
from .serializers import BorrowRecordSerializer

from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView


class BorrowHistoryView(generics.ListAPIView):
    serializer_class = BorrowRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRecord.objects.filter(
            user=self.request.user
        ).order_by("-borrow_date", "-id")


class FineListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        records = BorrowRecord.objects.all()

        total = 0

        data = []

        for record in records:

            fine = record.calculate_fine()

            if fine > 0:

                total += fine

                data.append({
                    "id": record.id,
                    "user": record.user.username,
                    "book": record.book.title,
                    "due_date": record.due_date,
                    "returned": record.return_date,
                    "fine": fine,
                })

        return Response({

            "total_fine": total,

            "records": data,

        })