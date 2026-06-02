import random
from django.shortcuts import render, redirect

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
    attempts = request.session.get('attempts', 0)

    if 'winners' not in request.session:
        request.session['winners'] = []

    winners = request.session['winners']
    winners.append({'name': name, 'attempts': attempts})
    request.session['winners'] = winners

    request.session['secret_number'] = random.randint(1, 100)
    request.session['attempts'] = 0
    request.session['result'] = None

    return redirect('/leaderboard')


def play_again(request):
    winners = request.session.get('winners', [])
    request.session.flush()
    request.session['winners'] = winners
    return redirect('/')


def leaderboard(request):
    winners = sorted(request.session.get('winners', []), key=lambda w: w['attempts'])
    return render(request, 'game/leaderboard.html', {'winners': winners})
