from django.contrib import admin
from django.urls import path, include
from blogs import views as blog_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', blog_views.index),          # Ninja bonus — root uses the same method as /blogs
    path('blogs/', include('blogs.urls')),
    path('surveys/', include('surveys.urls')),
    path('', include('users.urls')),
]
