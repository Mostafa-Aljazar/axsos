from django.urls import path
from . import views

urlpatterns = [
    path('wall', views.wall),
    path('wall/post_message', views.post_message),
    path('wall/post_comment/<int:message_id>', views.post_comment),
    path('wall/delete_message/<int:message_id>', views.delete_message),
]
