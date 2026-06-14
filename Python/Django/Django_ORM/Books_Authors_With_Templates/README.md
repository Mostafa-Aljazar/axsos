# Books & Authors — Django Templates

A full-stack Django app that manages Books and Authors with a many-to-many relationship, built with templates and forms.

---

## Features

- Add books and view all books in a table
- Add authors and view all authors in a table
- View a single book with its authors
- View a single author with their books
- Add an author to a book via dropdown (only shows authors not yet linked)
- Add a book to an author via dropdown (only shows books not yet linked)

---

## Models

**Book**
- `title` — CharField
- `desc` — TextField

**Author**
- `first_name`, `last_name` — CharField
- `notes` — TextField (optional)
- `books` — ManyToManyField → Book

---

## Routes

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/books` | List all books + add form |
| POST | `/books/create` | Create a new book |
| GET | `/books/<id>` | View a book's details and authors |
| POST | `/books/<id>/add_author` | Add an author to a book |
| GET | `/authors` | List all authors + add form |
| POST | `/authors/create` | Create a new author |
| GET | `/authors/<id>` | View an author's details and books |
| POST | `/authors/<id>/add_book` | Add a book to an author |

---

## Setup

```bash
# Create and activate virtual environment
python -m venv django_venv
source django_venv/Scripts/activate  # Windows

# Install Django
pip install django

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver
```

Then open [http://127.0.0.1:8000/books](http://127.0.0.1:8000/books)

---

## Bonus

The dropdown on the book detail page only shows authors **not yet linked** to that book, and vice versa on the author detail page — so you never see duplicate options.
