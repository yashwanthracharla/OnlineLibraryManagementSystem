from django.urls import path
from .views import RegisterView, MeView , UserListView ,UserDetailView , UserBorrowDetailsView
from .views import (
    RegisterView,
    MeView,
    UserListView,
    UserDeleteView,
)



urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", MeView.as_view()),
    path("users/", UserListView.as_view(), name="users"),
    path("users/<int:pk>/", UserDeleteView.as_view(), name="delete-user"),
    path("users/<int:pk>/details/",UserDetailView.as_view(),name="user-details",),
    path("users/<int:pk>/borrow-details/",UserBorrowDetailsView.as_view(),name="user-borrow-details",),
]