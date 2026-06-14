# The Wall

A Django wall app integrated with login and registration. After logging in or registering, users land on a shared wall where they can post messages and comment on each other's posts.

---

## Features

- Register and log in with validation and bcrypt password hashing
- Post messages to the shared wall (most recent on top)
- Comment on any message (oldest comment shown first)
- Delete your own messages — only within 30 minutes of posting
- `/wall` is session-protected — visiting it without logging in redirects to `/`
- Log out clears the session

---

## Routes

**Login App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Show login + registration forms |
| POST | `/register` | Validate and create user → redirect to `/wall` |
| POST | `/login` | Validate credentials → redirect to `/wall` |
| GET | `/logout` | Clear session → redirect to `/` |

**Wall App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/wall` | Show wall (session-protected) |
| POST | `/wall/post_message` | Post a new message |
| POST | `/wall/post_comment/<id>` | Post a comment on a message |
| POST | `/wall/delete_message/<id>` | Delete your message (30-min window) |

---

## Models

**User** (login_app)

| Field | Type |
|-------|------|
| `first_name` | CharField |
| `last_name` | CharField |
| `email` | EmailField (unique) |
| `password_hash` | CharField (bcrypt) |

**Message** (wall_app)

| Field | Type |
|-------|------|
| `user` | ForeignKey → User |
| `message` | TextField |
| `created_at` | DateTimeField (auto) |

**Comment** (wall_app)

| Field | Type |
|-------|------|
| `user` | ForeignKey → User |
| `message` | ForeignKey → Message |
| `comment` | TextField |
| `created_at` | DateTimeField (auto) |

---

## Validation Rules

| Field | Rule |
|-------|------|
| First / Last Name | At least 2 characters, letters only |
| Email | Valid format, must be unique |
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
