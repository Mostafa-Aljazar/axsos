# Login and Registration

A Django app with full login and registration, server-side validation, password hashing, and session-based authentication.

---

## Features

- Register with first name, last name, email, password, and optional birthday
- Log in with email and password
- Flash error messages for any validation failure
- Passwords are hashed with bcrypt — never stored as plain text
- Session stores the user after login or registration
- `/success` is protected — visiting it without a session redirects to the home page
- Log out clears the session and redirects back to the login/registration page

---

## Validation Rules

**Registration**

| Field | Rule |
|-------|------|
| First Name | At least 2 characters, letters only |
| Last Name | At least 2 characters, letters only |
| Email | Valid format, must be unique |
| Password | At least 8 characters |
| Confirm PW | Must match password |
| Birthday | Must be in the past; user must be at least 13 years old (COPPA) |

**Login**

| Field | Rule |
|-------|------|
| Email + Password | Must match a registered account |

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Show registration + login forms |
| POST | `/register` | Validate and create user → redirect to `/success` |
| POST | `/login` | Validate credentials → redirect to `/success` |
| GET | `/success` | Welcome page (session-protected) |
| GET | `/logout` | Clear session → redirect to `/` |

---

## Model — `User`

| Field | Type |
|-------|------|
| `first_name` | CharField |
| `last_name` | CharField |
| `email` | EmailField (unique) |
| `password_hash` | CharField (bcrypt hash) |
| `birthday` | DateField (optional) |
| `created_at` | DateTimeField (auto) |
| `updated_at` | DateTimeField (auto) |

Validation lives in `UserManager` extending `models.Manager`, keeping all logic in the model layer.

---

## Setup

```bash
pip install bcrypt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000)
