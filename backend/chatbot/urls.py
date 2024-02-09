from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat, name='chat'),
    path('translator', views.translator, name='translator'),
    path('corrector', views.corrector, name='corrector')
]