from django.urls import path
from . import views

urlpatterns = [
    path('dashboard', views.dashboard),
    path('dashboard/admin', views.dashboard),
    path('users/new', views.new_user),
    path('users/create', views.create_user),
    path('users/show/<int:user_id>', views.show_user),
    path('users/show/<int:user_id>/message', views.post_message),
    path('users/edit', views.edit_profile),
    path('users/edit/submit', views.update_profile),
    path('users/edit/<int:user_id>', views.edit_user),
    path('users/edit/<int:user_id>/submit', views.update_user),
    path('users/remove/<int:user_id>', views.remove_user),
]
