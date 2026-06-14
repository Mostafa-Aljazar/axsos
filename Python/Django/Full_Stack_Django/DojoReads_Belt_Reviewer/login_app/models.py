import re
import bcrypt
from django.db import models


class UserManager(models.Manager):
    def register_validator(self, data):
        errors = {}
        if len(data.get('name', '').strip()) < 2:
            errors['name'] = 'Name must be at least 2 characters.'
        if len(data.get('alias', '').strip()) < 2:
            errors['alias'] = 'Alias must be at least 2 characters.'
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', data.get('email', '')):
            errors['email'] = 'Enter a valid email address.'
        elif User.objects.filter(email=data['email']).exists():
            errors['email'] = 'Email is already registered.'
        if len(data.get('password', '')) < 8:
            errors['password'] = 'Password must be at least 8 characters.'
        elif data['password'] != data.get('confirm_pw', ''):
            errors['confirm_pw'] = 'Passwords do not match.'
        return errors

    def login_validator(self, data):
        errors = {}
        user = User.objects.filter(email=data.get('email', '')).first()
        if not user:
            errors['email'] = 'No account found with that email.'
        elif not bcrypt.checkpw(data['password'].encode(), user.password_hash.encode()):
            errors['password'] = 'Incorrect password.'
        return errors


class User(models.Model):
    name          = models.CharField(max_length=255)
    alias         = models.CharField(max_length=255)
    email         = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)
    objects       = UserManager()
