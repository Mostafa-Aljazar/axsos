from django.shortcuts import render, redirect


def index(request):
    if 'visits' not in request.session:
        request.session['visits'] = 0
    if 'counter' not in request.session:
        request.session['counter'] = 0

    request.session['visits'] += 1

    context = {
        'visits': request.session['visits'],
        'counter': request.session['counter'],
    }
    return render(request, 'counter/index.html', context)


def increment_two(request):
    if 'counter' not in request.session:
        request.session['counter'] = 0
    request.session['counter'] += 2
    return redirect('/')


def increment_custom(request):
    amount = int(request.POST.get('amount', 1))
    if 'counter' not in request.session:
        request.session['counter'] = 0
    request.session['counter'] += amount
    return redirect('/')


def destroy_session(request):
    del request.session['counter']    # clears a specific key
    del request.session['visits']     # clears a specific key
    # request.session.flush()
    return redirect('/')
