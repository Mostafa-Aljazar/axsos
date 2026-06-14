from django.db import models
from login_app.models import User


class BookManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        title = postData.get('title', '').strip()
        desc  = postData.get('desc',  '').strip()

        if not title:
            errors['title'] = 'Title is required.'
        if len(desc) < 5:
            errors['desc'] = 'Description must be at least 5 characters.'

        return errors


class Book(models.Model):
    title         = models.CharField(max_length=255)
    desc          = models.TextField()
    uploaded_by   = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books_uploaded')
    users_who_like = models.ManyToManyField(User, related_name='liked_books')
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)
    objects       = BookManager()

    def __str__(self):
        return self.title
