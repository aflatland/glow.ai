from django.urls import path
from members.views import LoginView

urlpatterns = [
    path('members/', LoginView.as_view(), name = 'members'),
]