from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    desc  = models.CharField(max_length=45)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Author(models.Model):
    first_name = models.CharField(max_length=255)
    last_name  = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    books      = models.ManyToManyField(Book, related_name='authors')
    notes = models.TextField(blank=True)



    def __str__(self):
        return f"{self.first_name} {self.last_name}"