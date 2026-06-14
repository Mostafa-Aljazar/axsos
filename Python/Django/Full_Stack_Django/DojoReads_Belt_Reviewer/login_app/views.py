import bcrypt
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User


def index(request):
    if request.session.get('user_id'):
        return redirect('/books')
    return render(request, 'login_app/index.html')


def register(request):
    errors = User.objects.register_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/')
    pw_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
    user = User.objects.create(
        name=request.POST['name'].strip(),
        alias=request.POST['alias'].strip(),
        email=request.POST['email'],
        password_hash=pw_hash,
    )
    request.session['user_id'] = user.id
    return redirect('/books')


def login(request):
    errors = User.objects.login_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/')
    user = User.objects.get(email=request.POST['email'])
    request.session['user_id'] = user.id
    return redirect('/books')


def logout(request):
    request.session.flush()
    return redirect('/')
