from django.urls import path
from .views import BorrowHistoryView, FineListView

urlpatterns = [
    path("history/", BorrowHistoryView.as_view(), name="borrow-history"),

    path("fines/", FineListView.as_view()),
]