# Users With Templates

A Django project that connects a `User` model to a full MTV architecture — a page that shows all users in a table and a form to add new ones.

---

## How to Run

```bash
cd Users_With_Templates
python manage.py migrate
python manage.py runserver
```

Then open `http://localhost:8000/`

---

## Features

- Displays all users from the database in a table (ID, Name, Email, Age)
- Form to add a new user (First Name, Last Name, Email, Age)
- Submitting the form saves the user to the database and redirects back to the list

---

## Routes

| Method | URL       | Description                         |
|--------|-----------|-------------------------------------|
| GET    | `/`       | Show all users + add-user form      |
| POST   | `/create` | Save new user, redirect to `/`      |

---

## The Model

```python
class User(models.Model):
    first_name    = models.CharField(max_length=255)
    last_name     = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)
    age           = models.IntegerField()
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)
```

---

## Project Structure

```
Users_With_Templates/
├── manage.py
├── users_project/
│   ├── settings.py
│   └── urls.py
└── users_app/
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── templates/
    │   └── users_app/
    │       └── index.html
    ├── static/
    │   └── users_app/
    │       └── css/
    │           └── style.css
    └── migrations/
        └── 0001_initial.py
```
