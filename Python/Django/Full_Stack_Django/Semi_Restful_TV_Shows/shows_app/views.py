from django.shortcuts import render, redirect
from .models import Show


def index(request):
    return redirect('/shows')


def all_shows(request):
    all_shows = Show.objects.all()
    return render(request, 'shows_app/index.html', {'shows': all_shows})


def new(request):
    return render(request, 'shows_app/new.html')


def create(request):
    if request.method == 'POST':
        show = Show.objects.create(
            title=request.POST['title'],
            network=request.POST['network'],
            release_date=request.POST['release_date'],
            description=request.POST['description'],
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
        one_show = Show.objects.get(id=show_id)
        one_show.title = request.POST['title']
        one_show.network = request.POST['network']
        one_show.release_date = request.POST['release_date']
        one_show.description = request.POST['description']
        one_show.save()
        return redirect(f'/shows/{show_id}')
    return redirect(f'/shows/{show_id}/edit')


def destroy(request, show_id):
    if request.method == 'POST':
        Show.objects.get(id=show_id).delete()
    return redirect('/shows')
