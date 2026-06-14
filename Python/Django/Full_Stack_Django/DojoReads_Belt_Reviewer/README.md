# DojoReads — Belt Reviewer

A full-stack Django app where logged-in users can browse books, read reviews, post their own reviews, and delete only their own reviews. Built as a belt exam reviewer to practice login/registration, ORM relationships, and template rendering.

---

## Features

- Register with name, alias, email, and password (bcrypt hashed)
- Log in / log out with session management
- Home page shows the 3 most recent reviews on the left and other reviewed books on the right
- Add a new book with a title and review in one form — pick an existing author or add a new one
- Book detail page lists all reviews; users can add a review and delete only their own
- User profile page shows alias, name, email, total review count, and all posted reviews
- All routes are session-guarded — non-logged-in visitors are redirected to `/`

---

## Routes

**Login App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Welcome page with register + login forms |
| POST | `/register` | Create account → redirect to `/books` |
| POST | `/login` | Log in → redirect to `/books` |
| GET | `/logout` | Clear session → redirect to `/` |

**Books App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/books` | Home — recent reviews + other books |
| GET | `/books/add` | Add book form |
| POST | `/books/add` | Create book + first review → redirect to book page |
| GET | `/books/<id>` | Book detail + all reviews + add review form |
| POST | `/books/<id>/review` | Submit a review → redirect to book page |
| POST | `/reviews/<id>/delete` | Delete own review → redirect to book page |
| GET | `/users/<id>` | User profile with all their reviews |

---

## Models

**User** (login_app)

| Field | Type |
|---|---|
| `name` | CharField |
| `alias` | CharField |
| `email` | EmailField (unique) |
| `password_hash` | CharField (bcrypt) |

**Author** (books_app)

| Field | Type |
|---|---|
| `name` | CharField |

**Book** (books_app)

| Field | Type |
|---|---|
| `title` | CharField |
| `author` | ForeignKey → Author (`related_name='books'`) |

**Review** (books_app)

| Field | Type |
|---|---|
| `review` | TextField |
| `rating` | IntegerField (1–5) |
| `book` | ForeignKey → Book (`related_name='reviews'`) |
| `reviewer` | ForeignKey → User (`related_name='reviews'`) |

---

## Validation Rules

**Registration**

| Field | Rule |
|---|---|
| Name | At least 2 characters |
| Alias | At least 2 characters |
| Email | Valid format, must be unique |
| Password | At least 8 characters, must match confirm |

**Add Book + Review**

| Field | Rule |
|---|---|
| Title | Required |
| Author | Must pick existing or enter a new name (2+ chars) |
| Review | Required |
| Rating | Integer between 1 and 5 |

---

## Setup

```bash
pip install bcrypt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000)
