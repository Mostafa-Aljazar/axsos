from django.db import models
from login_app.models import User


class Author(models.Model):
    name       = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class BookManager(models.Manager):
    def book_validator(self, data):
        errors = {}
        if len(data.get('title', '').strip()) < 1:
            errors['title'] = 'Book title is required.'
        if not data.get('author_id') and len(data.get('new_author', '').strip()) < 2:
            errors['author'] = 'Select an author or enter a new author name (2+ characters).'
        return errors


class Book(models.Model):
    title      = models.CharField(max_length=255)
    author     = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects    = BookManager()


class ReviewManager(models.Manager):
    def review_validator(self, data):
        errors = {}
        if len(data.get('review', '').strip()) < 1:
            errors['review'] = 'Review text is required.'
        rating = data.get('rating', '')
        if not rating or not rating.isdigit() or int(rating) < 1 or int(rating) > 5:
            errors['rating'] = 'Rating must be between 1 and 5.'
        return errors


class Review(models.Model):
    review     = models.TextField()
    rating     = models.IntegerField()
    book       = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    reviewer   = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects    = ReviewManager()
