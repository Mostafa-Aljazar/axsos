from django.shortcuts import render


def index(request):
    return render(request, 'survey/index.html')


def result(request):
    context = {
        'name': request.POST.get('name', ''),
        'location': request.POST.get('location', ''),
        'language': request.POST.get('language', ''),
        'comment': request.POST.get('comment', ''),
    }
    return render(request, 'survey/result.html', context)
