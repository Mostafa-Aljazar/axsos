from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('users', views.index, name='index'),
    path('users/new', views.register, name='new'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
]
