# Favorite Books

A full-stack Django app where users register, log in, upload books, and mark each other's books as favorites. Combines login/registration with one-to-many and many-to-many ORM relationships.

---

## Features

- Register and log in with full validation and bcrypt password hashing
- Add a book with a title and description — you automatically favorite it
- See all books on the main page with who uploaded them
- Ninja bonus: if you haven't favorited a book, an "Add to Favorites" link appears right on the main page
- Click a book title to see its details and the list of users who like it
- Un-favorite a book from the detail page if you've already liked it
- If you uploaded the book, you can edit or delete it
- Sensei bonus: a "My Favorites" page lists all books you've liked
- All protected routes redirect to `/` if you're not logged in

---

## Routes

**Login App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Login + registration page |
| POST | `/register` | Create user → redirect to `/books` |
| POST | `/login` | Log in → redirect to `/books` |
| GET | `/logout` | Clear session → redirect to `/` |

**Books App**

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/books` | Main page — add form + all books |
| POST | `/books/add` | Create book + auto-favorite it |
| GET | `/books/my_favorites` | Current user's favorite books |
| GET | `/books/<id>` | Book detail + likers list |
| POST | `/books/<id>/favorite` | Add book to favorites |
| POST | `/books/<id>/unfavorite` | Remove book from favorites |
| GET | `/books/<id>/edit` | Edit form (uploader only) |
| POST | `/books/<id>/update` | Save edits (uploader only) |
| POST | `/books/<id>/delete` | Delete book (uploader only) |

---

## Models

**User** (login_app)

| Field | Type |
|---|---|
| `first_name` | CharField |
| `last_name` | CharField |
| `email` | EmailField (unique) |
| `password_hash` | CharField (bcrypt) |

**Book** (books_app)

| Field | Type |
|---|---|
| `title` | CharField |
| `desc` | TextField |
| `uploaded_by` | ForeignKey → User (`related_name='books_uploaded'`) |
| `users_who_like` | ManyToManyField → User (`related_name='liked_books'`) |

---

## Validation Rules

**Registration**

| Field | Rule |
|---|---|
| First / Last Name | At least 2 characters, letters only |
| Email | Valid format, must be unique |
| Password | At least 8 characters, must match confirm |

**Book**

| Field | Rule |
|---|---|
| Title | Required |
| Description | At least 5 characters |

---

## Setup

```bash
pip install bcrypt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000)
