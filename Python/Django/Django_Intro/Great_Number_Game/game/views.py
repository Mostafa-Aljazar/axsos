import random
from django.shortcuts import render, redirect
from .models import Winner

MAX_ATTEMPTS = 5


def index(request):
    if 'secret_number' not in request.session:
        request.session['secret_number'] = random.randint(1, 100)
        request.session['attempts'] = 0
        request.session['result'] = None

    context = {
        'result': request.session['result'],
        'attempts': request.session['attempts'],
        'remaining': MAX_ATTEMPTS - request.session['attempts'],
        'secret_number': request.session['secret_number'],
    }
    return render(request, 'game/index.html', context)


def guess(request):
    user_guess = int(request.POST.get('guess', 0))
    secret = request.session['secret_number']

    request.session['attempts'] += 1
    attempts = request.session['attempts']

    if user_guess == secret:
        request.session['result'] = 'correct'
    elif attempts >= MAX_ATTEMPTS:
        request.session['result'] = 'lose'
    elif user_guess < secret:
        request.session['result'] = 'low'
    else:
        request.session['result'] = 'high'

    return redirect('/')


def save_winner(request):
    name = request.POST.get('name', 'Anonymous')
    Winner.objects.create(name=name, attempts=request.session.get('attempts', 0))
    request.session.flush()
    return redirect('/leaderboard')


def play_again(request):
    request.session.flush()
    return redirect('/')


def leaderboard(request):
    winners = Winner.objects.all().order_by('attempts', 'created_at')
    return render(request, 'game/leaderboard.html', {'winners': winners})
