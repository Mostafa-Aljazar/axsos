import bcrypt
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User


def home(request):
    if request.session.get('user_id'):
        return redirect('/dashboard')
    return render(request, 'login_app/home.html')


def signin_page(request):
    if request.session.get('user_id'):
        return redirect('/dashboard')
    return render(request, 'login_app/signin.html')


def register_page(request):
    if request.session.get('user_id'):
        return redirect('/dashboard')
    return render(request, 'login_app/register.html')


def register(request):
    errors = User.objects.register_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/register')
    pw_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
    is_first = not User.objects.exists()
    user = User.objects.create(
        email=request.POST['email'],
        first_name=request.POST['first_name'].strip(),
        last_name=request.POST['last_name'].strip(),
        password_hash=pw_hash,
        user_level=9 if is_first else 1,
    )
    request.session['user_id'] = user.id
    return redirect('/dashboard')


def login(request):
    errors = User.objects.login_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/signin')
    user = User.objects.get(email=request.POST['email'])
    request.session['user_id'] = user.id
    return redirect('/dashboard')


def logout(request):
    request.session.flush()
    return redirect('/')
