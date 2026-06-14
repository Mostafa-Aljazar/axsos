import bcrypt
from django.shortcuts import render, redirect
from django.contrib import messages
from login_app.models import User
from .models import Message


def guard(request):
    if not request.session.get('user_id'):
        return redirect('/')
    return None


def admin_guard(request):
    block = guard(request)
    if block:
        return block
    user = User.objects.get(id=request.session['user_id'])
    if user.user_level != 9:
        return redirect('/dashboard')
    return None


def dashboard(request):
    block = guard(request)
    if block:
        return block
    user = User.objects.get(id=request.session['user_id'])
    all_users = User.objects.all()
    if user.user_level == 9:
        return render(request, 'users_app/admin_dashboard.html', {'user': user, 'all_users': all_users})
    return render(request, 'users_app/user_dashboard.html', {'user': user, 'all_users': all_users})


def new_user(request):
    block = admin_guard(request)
    if block:
        return block
    return render(request, 'users_app/new_user.html', {'user': User.objects.get(id=request.session['user_id'])})


def create_user(request):
    block = admin_guard(request)
    if block:
        return block
    errors = User.objects.register_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/users/new')
    pw_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
    User.objects.create(
        email=request.POST['email'],
        first_name=request.POST['first_name'].strip(),
        last_name=request.POST['last_name'].strip(),
        password_hash=pw_hash,
        user_level=1,
    )
    return redirect('/dashboard/admin')


def show_user(request, user_id):
    block = guard(request)
    if block:
        return block
    current = User.objects.get(id=request.session['user_id'])
    profile = User.objects.get(id=user_id)
    wall_messages = Message.objects.filter(recipient=profile).select_related('sender')
    return render(request, 'users_app/show_user.html', {
        'user': current,
        'profile': profile,
        'wall_messages': wall_messages,
    })


def post_message(request, user_id):
    block = guard(request)
    if block:
        return block
    content = request.POST.get('content', '').strip()
    if not content:
        messages.error(request, 'Message cannot be empty.')
        return redirect(f'/users/show/{user_id}')
    sender = User.objects.get(id=request.session['user_id'])
    recipient = User.objects.get(id=user_id)
    Message.objects.create(content=content, sender=sender, recipient=recipient)
    return redirect(f'/users/show/{user_id}')


def edit_user(request, user_id):
    block = admin_guard(request)
    if block:
        return block
    current = User.objects.get(id=request.session['user_id'])
    profile = User.objects.get(id=user_id)
    return render(request, 'users_app/edit_user.html', {'user': current, 'profile': profile})


def update_user(request, user_id):
    block = admin_guard(request)
    if block:
        return block
    profile = User.objects.get(id=user_id)
    errors = User.objects.edit_validator(request.POST, user_id)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect(f'/users/edit/{user_id}')
    profile.email      = request.POST['email']
    profile.first_name = request.POST['first_name'].strip()
    profile.last_name  = request.POST['last_name'].strip()
    profile.user_level = int(request.POST.get('user_level', 1))
    if request.POST.get('password'):
        pw_errors = User.objects.password_validator(request.POST)
        if pw_errors:
            for msg in pw_errors.values():
                messages.error(request, msg)
            return redirect(f'/users/edit/{user_id}')
        profile.password_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
    profile.save()
    return redirect('/dashboard/admin')


def remove_user(request, user_id):
    block = admin_guard(request)
    if block:
        return block
    current_id = request.session['user_id']
    if user_id == current_id:
        messages.error(request, 'You cannot remove yourself.')
        return redirect('/dashboard/admin')
    User.objects.get(id=user_id).delete()
    return redirect('/dashboard/admin')


def edit_profile(request):
    block = guard(request)
    if block:
        return block
    user = User.objects.get(id=request.session['user_id'])
    return render(request, 'users_app/edit_profile.html', {'user': user})


def update_profile(request):
    block = guard(request)
    if block:
        return block
    user = User.objects.get(id=request.session['user_id'])
    errors = User.objects.edit_validator(request.POST, user.id)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/users/edit')
    user.email       = request.POST['email']
    user.first_name  = request.POST['first_name'].strip()
    user.last_name   = request.POST['last_name'].strip()
    user.description = request.POST.get('description', '').strip()
    if request.POST.get('password'):
        pw_errors = User.objects.password_validator(request.POST)
        if pw_errors:
            for msg in pw_errors.values():
                messages.error(request, msg)
            return redirect('/users/edit')
        user.password_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt()).decode()
    user.save()
    return redirect('/dashboard')
