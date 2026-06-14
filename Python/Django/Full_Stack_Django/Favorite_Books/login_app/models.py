import re
from django.db import models
import bcrypt


class UserManager(models.Manager):
    def register_validator(self, postData):
        errors = {}
        first_name = postData.get('first_name', '').strip()
        last_name  = postData.get('last_name',  '').strip()
        email      = postData.get('email',      '').strip()
        password   = postData.get('password',   '')
        confirm    = postData.get('confirm_pw', '')

        if len(first_name) < 2:
            errors['first_name'] = 'First name must be at least 2 characters.'
        elif not first_name.isalpha():
            errors['first_name'] = 'First name must contain letters only.'

        if len(last_name) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters.'
        elif not last_name.isalpha():
            errors['last_name'] = 'Last name must contain letters only.'

        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
            errors['email'] = 'Please enter a valid email address.'
        elif self.filter(email=email).exists():
            errors['email'] = 'That email is already registered.'

        if len(password) < 8:
            errors['password'] = 'Password must be at least 8 characters.'
        elif password != confirm:
            errors['password'] = 'Passwords do not match.'

        return errors

    def login_validator(self, postData):
        errors = {}
        email    = postData.get('email',    '').strip()
        password = postData.get('password', '')

        users = self.filter(email=email)
        if not users.exists():
            errors['login'] = 'Invalid email or password.'
            return errors

        if not bcrypt.checkpw(password.encode(), users.first().password_hash.encode()):
            errors['login'] = 'Invalid email or password.'

        return errors


class User(models.Model):
    first_name    = models.CharField(max_length=255)
    last_name     = models.CharField(max_length=255)
    email         = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)
    objects       = UserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
