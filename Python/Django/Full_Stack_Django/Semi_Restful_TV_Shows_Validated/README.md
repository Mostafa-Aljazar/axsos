# Semi-Restful TV Shows — With Validations

Builds on the Semi-Restful TV Shows project by adding server-side validation using a custom Django Manager and the messages framework.

---

## What's New

- Validation runs before any data is saved to the database
- Errors are displayed on the form using Django's flash messages
- Same validations apply to both creating and editing a show

---

## Validation Rules

| Field | Rule |
|-------|------|
| Title | Required, at least 2 characters, must be unique |
| Network | Required, at least 3 characters |
| Release Date | Required, must be in the past |
| Description | Optional — but if provided, must be at least 10 characters |

---

## How Validation Works

Validation logic lives in a custom Manager class (`ShowManager`) inside `models.py`, following Django's convention of keeping database-related logic in the model layer.

```python
class ShowManager(models.Manager):
    def basic_validator(self, postData, exclude_id=None):
        errors = {}
        # ... validation rules ...
        return errors

class Show(models.Model):
    objects = ShowManager()
```

In the view, we call the validator and use `messages.error()` to pass errors to the template:

```python
errors = Show.objects.basic_validator(request.POST)
if errors:
    for key, value in errors.items():
        messages.error(request, value)
    return redirect('/shows/new')
```

In the template, errors are displayed with `{% if messages %}`.

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Redirect to `/shows` |
| GET | `/shows` | List all shows |
| GET | `/shows/new` | Form to add a new show |
| POST | `/shows/create` | Validate + save → redirect to `/shows/<id>` |
| GET | `/shows/<id>` | Show details |
| GET | `/shows/<id>/edit` | Edit form (pre-filled) |
| POST | `/shows/<id>/update` | Validate + update → redirect to `/shows/<id>` |
| POST | `/shows/<id>/destroy` | Delete → redirect to `/shows` |

---

## Setup

```bash
source django_venv/Scripts/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Visit [http://127.0.0.1:8000](http://127.0.0.1:8000)
