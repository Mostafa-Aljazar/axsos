import re
import bcrypt
from django.db import models


class UserManager(models.Manager):
    def register_validator(self, data):
        errors = {}
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', data.get('email', '')):
            errors['email'] = 'Enter a valid email address.'
        elif User.objects.filter(email=data['email']).exists():
            errors['email'] = 'Email is already registered.'
        if len(data.get('first_name', '').strip()) < 2:
            errors['first_name'] = 'First name must be at least 2 characters.'
        if len(data.get('last_name', '').strip()) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters.'
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

    def edit_validator(self, data, user_id):
        errors = {}
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', data.get('email', '')):
            errors['email'] = 'Enter a valid email address.'
        elif User.objects.filter(email=data['email']).exclude(id=user_id).exists():
            errors['email'] = 'That email is already taken.'
        if len(data.get('first_name', '').strip()) < 2:
            errors['first_name'] = 'First name must be at least 2 characters.'
        if len(data.get('last_name', '').strip()) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters.'
        return errors

    def password_validator(self, data):
        errors = {}
        if len(data.get('password', '')) < 8:
            errors['password'] = 'Password must be at least 8 characters.'
        elif data['password'] != data.get('confirm_pw', ''):
            errors['confirm_pw'] = 'Passwords do not match.'
        return errors


class User(models.Model):
    email         = models.EmailField(unique=True)
    first_name    = models.CharField(max_length=255)
    last_name     = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=255)
    user_level    = models.IntegerField(default=1)
    description   = models.TextField(blank=True, default='')
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)
    objects       = UserManager()
