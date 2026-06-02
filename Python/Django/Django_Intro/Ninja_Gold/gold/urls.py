from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('process_money/<str:location>', views.process_money),
    path('setup', views.setup),
    path('start_game', views.start_game),
    path('reset', views.reset),
]
