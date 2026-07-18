from django.urls import path

from .views import (
    BookReviewListCreateView,
    ReviewDeleteView,
    
)

urlpatterns = [

    path(
        "book/<int:book_id>/",
        BookReviewListCreateView.as_view(),
        name="book-reviews",
    ),

    path(
        "<int:pk>/",
        ReviewDeleteView.as_view(),
        name="delete-review",
    ),

    path(
        "book/<int:book_id>/add/",
        BookReviewListCreateView.as_view(),
        name="add-review",
    ),

    
]