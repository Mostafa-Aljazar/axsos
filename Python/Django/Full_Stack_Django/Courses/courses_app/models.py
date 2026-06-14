from django.db import models


class CourseManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}

        name = postData.get('name', '').strip()
        description = postData.get('description', '').strip()

        if len(name) <= 5:
            errors['name'] = 'Course name must be more than 5 characters.'

        if len(description) <= 15:
            errors['description'] = 'Description must be more than 15 characters.'

        return errors


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CourseManager()

    def __str__(self):
        return self.name
