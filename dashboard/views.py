from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from books.models import Book
from borrow.models import BorrowRecord
from reviews.models import Review

from django.db.models.functions import ExtractMonth


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

    return Response({
        
        "status": "dashboard working"
    })

        