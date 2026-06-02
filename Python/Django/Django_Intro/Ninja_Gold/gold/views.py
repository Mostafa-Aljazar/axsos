import random
from django.shortcuts import render, redirect
from django.utils import timezone


def index(request):
    if 'gold' not in request.session:
        request.session['gold'] = 0
        request.session['activities'] = []
        request.session['moves'] = 0

    gold = request.session['gold']
    moves = request.session['moves']
    max_moves = request.session.get('max_moves')
    goal = request.session.get('goal')

    game_over = None
    if goal and max_moves:
        if gold >= goal:
            game_over = 'win'
        elif moves >= max_moves:
            game_over = 'lose'

    context = {
        'gold': gold,
        'activities': request.session['activities'],
        'moves': moves,
        'max_moves': max_moves,
        'goal': goal,
        'game_over': game_over,
    }
    return render(request, 'gold/index.html', context)


def process_money(request, location):
    if 'gold' not in request.session:
        request.session['gold'] = 0
        request.session['activities'] = []
        request.session['moves'] = 0

    if location == 'quest':
        amount = random.randint(-50, 50)
    else:
        amount = random.randint(10, 20)

    request.session['gold'] += amount
    request.session['moves'] += 1

    now = timezone.localtime(timezone.now())
    timestamp = now.strftime("%B %d, %Y %I:%M %p")

    if location == 'quest':
        if amount >= 0:
            msg = f"You completed a quest and earned {amount} gold."
            kind = 'earn'
        else:
            msg = f"You failed a quest and lost {abs(amount)} gold. Ouch."
            kind = 'lose'
    else:
        msg = f"You entered a {location} and earned {amount} gold."
        kind = 'earn'

    request.session['activities'].insert(0, {'msg': msg, 'kind': kind, 'time': timestamp})
    request.session.save()

    return redirect('/')


def setup(request):
    return render(request, 'gold/setup.html')


def start_game(request):
    request.session.flush()
    request.session['gold'] = 0
    request.session['activities'] = []
    request.session['moves'] = 0
    request.session['max_moves'] = int(request.POST.get('max_moves', 10))
    request.session['goal'] = int(request.POST.get('goal', 100))
    return redirect('/')


def reset(request):
    request.session.flush()
    return redirect('/')
