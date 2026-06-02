from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('increment_two', views.increment_two),
    path('increment_custom', views.increment_custom),
    path('destroy_session', views.destroy_session),
]
