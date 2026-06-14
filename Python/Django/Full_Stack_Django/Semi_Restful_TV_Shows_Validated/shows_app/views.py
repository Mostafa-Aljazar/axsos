from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Show


def index(request):
    return redirect('/shows')


def all_shows(request):
    return render(request, 'shows_app/index.html', {'shows': Show.objects.all()})


def new(request):
    return render(request, 'shows_app/new.html')


def create(request):
    if request.method == 'POST':
        errors = Show.objects.basic_validator(request.POST)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/shows/new')
        show = Show.objects.create(
            title=request.POST['title'].strip(),
            network=request.POST['network'].strip(),
            release_date=request.POST['release_date'],
            description=request.POST['description'].strip(),
        )
        return redirect(f'/shows/{show.id}')
    return redirect('/shows/new')


def show(request, show_id):
    one_show = Show.objects.get(id=show_id)
    return render(request, 'shows_app/show.html', {'show': one_show})


def edit(request, show_id):
    one_show = Show.objects.get(id=show_id)
    return render(request, 'shows_app/edit.html', {'show': one_show})


def update(request, show_id):
    if request.method == 'POST':
        errors = Show.objects.basic_validator(request.POST, exclude_id=show_id)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect(f'/shows/{show_id}/edit')
        one_show = Show.objects.get(id=show_id)
        one_show.title = request.POST['title'].strip()
        one_show.network = request.POST['network'].strip()
        one_show.release_date = request.POST['release_date']
        one_show.description = request.POST['description'].strip()
        one_show.save()
        return redirect(f'/shows/{show_id}')
    return redirect(f'/shows/{show_id}/edit')


def destroy(request, show_id):
    if request.method == 'POST':
        Show.objects.get(id=show_id).delete()
    return redirect('/shows')
