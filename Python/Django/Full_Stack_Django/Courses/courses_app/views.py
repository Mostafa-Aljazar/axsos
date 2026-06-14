from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Course


def index(request):
    all_courses = Course.objects.all()
    return render(request, 'courses_app/index.html', {'courses': all_courses})


def create(request):
    if request.method == 'POST':
        errors = Course.objects.basic_validator(request.POST)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/')
        Course.objects.create(
            name=request.POST['name'].strip(),
            description=request.POST['description'].strip(),
        )
    return redirect('/')


def destroy(request, course_id):
    course = Course.objects.get(id=course_id)
    return render(request, 'courses_app/destroy.html', {'course': course})


def confirm_destroy(request, course_id):
    if request.method == 'POST':
        Course.objects.get(id=course_id).delete()
    return redirect('/')
