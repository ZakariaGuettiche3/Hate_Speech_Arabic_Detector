"""mon_projet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from elearning import views,TikTok
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('predecte/', views.predict_view),
    path('alltiktoke/', views.predict_view_list),
    path('categories/', views.predict_categories),
    path('TikTok/', TikTok.tiktok),
    path('registre/',views.registration.as_view()),
    path('login/',views.login.as_view()),
    path("historique/", views.historique.as_view()),
    path("historiqueget/", views.gethistorique, name="delete-note"),
    path('historiquedelete/', views.delete_historique),
]
