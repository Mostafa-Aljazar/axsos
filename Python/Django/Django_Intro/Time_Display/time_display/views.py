from django.shortcuts import render
from django.utils import timezone

def index(request):
    now = timezone.localtime(timezone.now())
    context = {
        "date": now.strftime("%b %d, %Y"),
        "time": now.strftime("%I:%M %p"),
    }
    return render(request, 'time_display/index.html', context)
