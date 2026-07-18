from django.urls import path

from .views import (
    UserListView,
    UserDeleteView,
    ProfileView,
    UpdateProfileView,
    ChangePasswordView,

)

urlpatterns = [

    path("", UserListView.as_view()),

    path("<int:pk>/", UserDeleteView.as_view()),

    path("profile/", ProfileView.as_view()),

    path("profile/update/", UpdateProfileView.as_view()),

    path("change-password/", ChangePasswordView.as_view()),

]