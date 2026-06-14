from django.db import models
from datetime import date


class ShowManager(models.Manager):
    def basic_validator(self, postData, exclude_id=None):
        errors = {}

        title = postData.get('title', '').strip()
        network = postData.get('network', '').strip()
        release_date = postData.get('release_date', '').strip()
        description = postData.get('description', '').strip()

        if len(title) < 2:
            errors['title'] = 'Title must be at least 2 characters.'
        else:
            existing = Show.objects.filter(title__iexact=title)
            if exclude_id:
                existing = existing.exclude(id=exclude_id)
            if existing.exists():
                errors['title'] = 'A show with that title already exists.'

        if len(network) < 3:
            errors['network'] = 'Network must be at least 3 characters.'

        if not release_date:
            errors['release_date'] = 'Release date is required.'
        else:
            try:
                parsed = date.fromisoformat(release_date)
                if parsed >= date.today():
                    errors['release_date'] = 'Release date must be in the past.'
            except ValueError:
                errors['release_date'] = 'Enter a valid date.'

        if description and len(description) < 10:
            errors['description'] = 'Description must be at least 10 characters if provided.'

        return errors


class Show(models.Model):
    title = models.CharField(max_length=255)
    network = models.CharField(max_length=255)
    release_date = models.DateField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ShowManager()

    def __str__(self):
        return self.title
