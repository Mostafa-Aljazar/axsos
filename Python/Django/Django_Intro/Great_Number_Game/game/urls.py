from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('guess', views.guess),
    path('save_winner', views.save_winner),
    path('play_again', views.play_again),
    path('leaderboard', views.leaderboard),
]
