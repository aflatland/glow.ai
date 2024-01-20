from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat, name='chat'),
    path('translate', views.translate, name='translate')
]