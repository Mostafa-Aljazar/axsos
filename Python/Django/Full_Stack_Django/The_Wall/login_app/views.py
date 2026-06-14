import bcrypt
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User


def index(request):
    if request.session.get('user_id'):
        return redirect('/wall')
    return render(request, 'login_app/index.html')


def register(request):
    if request.method != 'POST':
        return redirect('/')

    errors = User.objects.register_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/')

    password_hash = bcrypt.hashpw(
        request.POST['password'].encode(), bcrypt.gensalt()
    ).decode()

    user = User.objects.create(
        first_name=request.POST['first_name'].strip(),
        last_name=request.POST['last_name'].strip(),
        email=request.POST['email'].strip(),
        password_hash=password_hash,
    )
    request.session['user_id'] = user.id
    request.session['user_name'] = f'{user.first_name} {user.last_name}'
    return redirect('/wall')


def login(request):
    if request.method != 'POST':
        return redirect('/')

    errors = User.objects.login_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/')

    user = User.objects.get(email=request.POST['email'].strip())
    request.session['user_id'] = user.id
    request.session['user_name'] = f'{user.first_name} {user.last_name}'
    return redirect('/wall')


def logout(request):
    request.session.flush()
    return redirect('/')
