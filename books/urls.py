from django.urls import path
from .views import (
    BookListCreateView,
    BookDetailView,
    BorrowBookView,
    ReturnBookView,
)

urlpatterns = [
    path("", BookListCreateView.as_view(), name="book-list"),
    path("<int:pk>/", BookDetailView.as_view(), name="book-detail"),
    path("<int:pk>/borrow/", BorrowBookView.as_view(), name="borrow-book"),
    path("<int:pk>/return/", ReturnBookView.as_view(), name="return-book"),
]