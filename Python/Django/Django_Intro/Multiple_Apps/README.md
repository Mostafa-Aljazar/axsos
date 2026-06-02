# Multiple Apps

A Django project with three independent apps — `blogs`, `surveys`, and `users` — each handling its own set of routes.

---

## How to Run

```bash
cd Multiple_Apps
python manage.py migrate
python manage.py runserver
```

Open `http://localhost:8000`.

---

## Routes

### Blogs (`/blogs/`)

| URL | Method | Response |
|---|---|---|
| `/blogs/` | GET | "placeholder to display a list of all blogs" |
| `/blogs/new` | GET | "placeholder to display a new form to create a new blog" |
| `/blogs/create` | GET | Redirects to `/blogs` |
| `/blogs/<number>` | GET | "placeholder to display blog number: {number}" |
| `/blogs/<number>/edit` | GET | "placeholder to edit blog {number}" |
| `/blogs/<number>/delete` | GET | Redirects to `/blogs` |

### Surveys (`/surveys/`)

| URL | Method | Response |
|---|---|---|
| `/surveys/` | GET | "placeholder to display all the surveys created." |
| `/surveys/new` | GET | "placeholder for users to add a new survey." |

### Users

| URL | Method | Response |
|---|---|---|
| `/users` | GET | "placeholder to display all the list of users later." |
| `/users/new` | GET | Same as `/register` |
| `/register` | GET | "placeholder for users to create a new user record." |
| `/login` | GET | "placeholder for users to log in." |

---

## Project Structure

```
Multiple_Apps/
├── manage.py
├── multiple_apps_project/
│   ├── settings.py
│   └── urls.py            # Main router — includes all three apps
├── blogs/
│   ├── views.py
│   └── urls.py
├── surveys/
│   ├── views.py
│   └── urls.py
└── users/
    ├── views.py
    └── urls.py
```

---

## How the URLs Are Wired

The project `urls.py` routes each prefix to the matching app:

```python
path('blogs/', include('blogs.urls')),
path('surveys/', include('surveys.urls')),
path('', include('users.urls')),
```

`blogs` and `surveys` share the same prefix pattern, so they use `include()`. The `users` app routes have no shared prefix (`/register`, `/login`, `/users`), so it's included with an empty prefix.

### `/users/new` and `/register` share the same view

```python
path('register', views.register),
path('users/new', views.register),   # same function, different URL
```

---

## Bonus Completed

- **Ninja:** The root route `/` uses the same `index` method from the `blogs` app — no separate view or redirect needed
