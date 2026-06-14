# Courses

A Django app for creating and deleting courses, with server-side validation and a confirmation page before deleting.

---

## Features

- Add a new course with a name and description
- Validation runs before saving — errors are shown as flash messages
- View all courses in a table with the date they were added
- Click "remove" to go to a confirmation page before deleting
- Confirm page shows the course details and asks "Are you sure?"

---

## Validation Rules

| Field | Rule |
|-------|------|
| Name | Must be more than 5 characters |
| Description | Must be more than 15 characters |

Validation uses a custom `CourseManager` that extends Django's `models.Manager`, keeping all validation logic inside the model layer.

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Show form + all courses |
| POST | `/courses/create` | Validate and save course |
| GET | `/courses/destroy/<id>` | Confirmation page |
| POST | `/courses/confirm_destroy/<id>` | Delete course → redirect to `/` |

---

## Model — `Course`

| Field | Type |
|-------|------|
| `name` | CharField |
| `description` | TextField |
| `created_at` | DateTimeField (auto) |
| `updated_at` | DateTimeField (auto) |

---

## Setup

```bash
source django_venv/Scripts/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000)
