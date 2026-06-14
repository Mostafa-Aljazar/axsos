from django.urls import path
from . import views

urlpatterns = [
    path('books', views.books),
    path('books/add', views.add_book),
    path('books/my_favorites', views.my_favorites),
    path('books/<int:book_id>', views.show_book),
    path('books/<int:book_id>/favorite', views.favorite),
    path('books/<int:book_id>/unfavorite', views.unfavorite),
    path('books/<int:book_id>/edit', views.edit_book),
    path('books/<int:book_id>/update', views.update_book),
    path('books/<int:book_id>/delete', views.delete_book),
]
