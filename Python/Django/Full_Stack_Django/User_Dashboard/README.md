# User Dashboard

A full-stack Django app for managing users and leaving wall messages. Admins can add, edit, and remove any user. Normal users can browse the user list, view profiles, post messages, and edit their own profile. The first person to register automatically becomes an Admin.

---

## Features

- Register with email, first name, last name, and password (bcrypt hashed)
- First registered user is automatically set as Admin (`user_level = 9`)
- Admin dashboard shows all users in a table with edit and remove actions
- Clicking "remove" triggers a confirmation dialog before deleting
- Admin can add new users from `/users/new`
- Admin can edit any user's info, password, and user level from `/users/edit/<id>`
- Normal user dashboard shows all users (read-only, no edit/remove)
- Any logged-in user can view another user's profile and leave a wall message
- Users can edit their own profile (info, description, password) from `/users/edit`
- All routes are session-guarded; admin-only routes redirect normal users to dashboard

---

## Routes

**Login App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Home page |
| GET | `/signin` | Sign in page |
| GET | `/register` | Register page |
| POST | `/register/submit` | Create account → redirect to `/dashboard` |
| POST | `/login` | Log in → redirect to `/dashboard` |
| GET | `/logout` | Clear session → redirect to `/` |

**Users App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/dashboard` | Admin dashboard (edit/remove) or user dashboard (read-only) |
| GET | `/users/new` | Add new user form (admin only) |
| POST | `/users/create` | Create user → redirect to admin dashboard |
| GET | `/users/show/<id>` | User profile + wall messages |
| POST | `/users/show/<id>/message` | Post a wall message → redirect to profile |
| GET | `/users/edit` | Edit own profile |
| POST | `/users/edit/submit` | Save own profile changes |
| GET | `/users/edit/<id>` | Edit any user (admin only) |
| POST | `/users/edit/<id>/submit` | Save user changes → redirect to admin dashboard |
| POST | `/users/remove/<id>` | Delete user (admin only, confirmed via JS dialog) |

---

## Models

**User** (login_app)

| Field | Type | Notes |
|---|---|---|
| `email` | EmailField (unique) | |
| `first_name` | CharField | |
| `last_name` | CharField | |
| `password_hash` | CharField | bcrypt |
| `user_level` | IntegerField | 1 = normal, 9 = admin |
| `description` | TextField | editable from profile page |

**Message** (users_app)

| Field | Type | Notes |
|---|---|---|
| `content` | TextField | |
| `sender` | ForeignKey → User | `related_name='sent_messages'` |
| `recipient` | ForeignKey → User | `related_name='received_messages'` |

---

## Validation Rules

**Registration / Create User**

| Field | Rule |
|---|---|
| Email | Valid format, must be unique |
| First / Last Name | At least 2 characters |
| Password | At least 8 characters, must match confirm |

**Edit Info**

| Field | Rule |
|---|---|
| Email | Valid format, unique (excluding self) |
| First / Last Name | At least 2 characters |

**Change Password** (optional — only applied if a password is entered)

| Field | Rule |
|---|---|
| Password | At least 8 characters, must match confirm |

---

## Setup

```bash
pip install bcrypt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000)

> The first account you register will automatically be an Admin.
