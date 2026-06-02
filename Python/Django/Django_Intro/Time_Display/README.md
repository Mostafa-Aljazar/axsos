# Assignment: Time Display

A Django project that shows the current date and time on the homepage.

## Setup

Make sure Django is installed, then run:

```bash
python manage.py migrate
python manage.py runserver
```

Open your browser at `http://localhost:8000`

---

## Routes

### 1. `/` — Show current date and time

Method name: `index`

```python
def index(request):
    now = timezone.localtime(timezone.now())
    context = {
        "date": now.strftime("%b %d, %Y"),
        "time": now.strftime("%I:%M %p"),
    }
    return render(request, 'time_display/index.html', context)
```

**Behavior:** Gets the current local time and renders it in a styled template.

---

### 2. `/time_display/` — Same as root

Both routes point to the same `index` view.

---

## Route Summary

| URL | Method | Behavior |
| --- | ------ | -------- |
| `/` | `index` | Displays current date and time |
| `/time_display/` | `index` | Same as root |

---

## Key Django Concepts Used

| Concept | Where Used |
| ------- | ---------- |
| `render()` | Renders the HTML template with context |
| `django.utils.timezone` | Gets the current timezone-aware time |
| `{% load static %}` | Loads the custom CSS stylesheet |
| `include()` in URLs | Wiring `time_display` app URLs |

> **Ninja Bonus:** used `django.utils.timezone` instead of `time.gmtime()` — timezone-aware and no extra packages needed.

---

## Files Included

| File | Description |
| ---- | ----------- |
| `manage.py` | Django project entry point |
| `time_display_project/settings.py` | Project settings (timezone: Asia/Amman) |
| `time_display_project/urls.py` | Main URL configuration |
| `time_display/views.py` | View function that gets the time |
| `time_display/urls.py` | App-level URL patterns |
| `time_display/templates/time_display/index.html` | HTML template |
| `time_display/static/css/style.css` | Custom stylesheet |
