from django.shortcuts import render, redirect
from .models import Dojo, Ninja


def index(request):
    all_dojos = Dojo.objects.all()
    all_dojos_for_dropdown = Dojo.objects.all()
    return render(request, 'dojos_ninjas_app/index.html', {
        'dojos': all_dojos,
        'dojos_dropdown': all_dojos_for_dropdown,
    })


def create_dojo(request):
    name = request.POST.get('name', '').strip()
    city = request.POST.get('city', '').strip()
    state = request.POST.get('state', '').strip()

    if all([name, city, state]):
        Dojo.objects.create(name=name, city=city, state=state)

    return redirect('/')


def create_ninja(request):
    first_name = request.POST.get('first_name', '').strip()
    last_name = request.POST.get('last_name', '').strip()
    dojo_id = request.POST.get('dojo_id', '').strip()

    if all([first_name, last_name, dojo_id]):
        dojo = Dojo.objects.get(id=dojo_id)
        Ninja.objects.create(dojo=dojo, first_name=first_name, last_name=last_name)

    return redirect('/')


def delete_dojo(request, dojo_id):
    dojo = Dojo.objects.get(id=dojo_id)
    dojo.delete()
    return redirect('/')
