from datetime import timezone
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils import timezone as tz
from login_app.models import User
from .models import Message, Comment


def wall(request):
    if not request.session.get('user_id'):
        return redirect('/')
    all_messages = Message.objects.select_related('user').prefetch_related('comments__user').all()
    return render(request, 'wall_app/wall.html', {'wall_messages': all_messages})


def post_message(request):
    if not request.session.get('user_id'):
        return redirect('/')
    if request.method == 'POST':
        content = request.POST.get('message', '').strip()
        if not content:
            messages.error(request, 'Message cannot be empty.')
            return redirect('/wall')
        user = User.objects.get(id=request.session['user_id'])
        Message.objects.create(user=user, message=content)
    return redirect('/wall')


def post_comment(request, message_id):
    if not request.session.get('user_id'):
        return redirect('/')
    if request.method == 'POST':
        content = request.POST.get('comment', '').strip()
        if not content:
            messages.error(request, 'Comment cannot be empty.')
            return redirect('/wall')
        user = User.objects.get(id=request.session['user_id'])
        message = Message.objects.get(id=message_id)
        Comment.objects.create(user=user, message=message, comment=content)
    return redirect('/wall')


def delete_message(request, message_id):
    if not request.session.get('user_id'):
        return redirect('/')
    if request.method == 'POST':
        msg = Message.objects.get(id=message_id)
        if msg.user.id == request.session['user_id']:
            age = tz.now() - msg.created_at
            if age.total_seconds() <= 1800:
                msg.delete()
            else:
                messages.error(request, 'You can only delete messages within 30 minutes of posting.')
    return redirect('/wall')
