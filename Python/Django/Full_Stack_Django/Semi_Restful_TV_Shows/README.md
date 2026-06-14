# Semi-Restful TV Shows

A full-stack Django app with full CRUD for TV shows, following RESTful routing conventions.

---

## Features

- View all TV shows in a table
- Add a new show with title, network, release date, and description
- View a single show's details
- Edit any show
- Delete a show
- Root route `/` redirects to `/shows`

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Redirect to `/shows` |
| GET | `/shows` | List all shows |
| GET | `/shows/new` | Form to add a new show |
| POST | `/shows/create` | Save new show → redirect to `/shows/<id>` |
| GET | `/shows/<id>` | Show details for one show |
| GET | `/shows/<id>/edit` | Form to edit a show (pre-filled) |
| POST | `/shows/<id>/update` | Save edits → redirect to `/shows/<id>` |
| POST | `/shows/<id>/destroy` | Delete show → redirect to `/shows` |

---

## Model — `Show`

| Field | Type |
|-------|------|
| `title` | CharField |
| `network` | CharField |
| `release_date` | DateField |
| `description` | TextField |
| `created_at` | DateTimeField (auto) |
| `updated_at` | DateTimeField (auto) |

---

## Setup

```bash
# Activate virtual environment
source django_venv/Scripts/activate  # Windows

# Install Django
pip install django

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) — it redirects to `/shows` automatically.
