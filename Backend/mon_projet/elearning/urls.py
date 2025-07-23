from django.urls import path
from . import views

urlpatterns = [
     path("registre", views.registration.as_view()),
]