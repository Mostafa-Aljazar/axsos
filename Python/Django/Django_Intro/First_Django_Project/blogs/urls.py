from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new', views.new, name='new'),
    path('create', views.create, name='create'),
    path('json', views.blog_json, name='blog_json'),
    path('<int:number>', views.show, name='show'),
    path('<int:number>/edit', views.edit, name='edit'),
    path('<int:number>/delete', views.destroy, name='destroy'),
]
