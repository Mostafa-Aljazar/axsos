from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('signin', views.signin_page),
    path('register', views.register_page),
    path('login', views.login),
    path('register/submit', views.register),
    path('logout', views.logout),
]
