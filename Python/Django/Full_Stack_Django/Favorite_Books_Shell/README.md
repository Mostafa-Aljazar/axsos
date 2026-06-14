# Favorite Books (Shell)

A Django ORM exercise practicing one-to-many and many-to-many relationships between users and books.

---

## Relationships

There are **two distinct relationships** between `User` and `Book`:

| Relationship | Field | Direction |
|---|---|---|
| One-to-many | `uploaded_by` (ForeignKey) | One user uploads many books |
| Many-to-many | `users_who_like` (ManyToManyField) | Many users can like many books |

The `related_name` on each field gives clean access in both directions:

```python
# One-to-many
Book.objects.first().uploaded_by          # user who uploaded this book
User.objects.first().books_uploaded.all() # all books uploaded by this user

# Many-to-many
Book.objects.first().users_who_like.all() # users who like this book
User.objects.first().liked_books.all()    # books this user likes
```

---

## Models

**User**

| Field | Type |
|---|---|
| `first_name` | CharField |
| `last_name` | CharField |
| `email` | EmailField (unique) |

**Book**

| Field | Type |
|---|---|
| `title` | CharField |
| `desc` | TextField |
| `uploaded_by` | ForeignKey → User (`related_name='books_uploaded'`) |
| `users_who_like` | ManyToManyField → User (`related_name='liked_books'`) |

---

## Setup

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py shell
```

Inside the shell, run the practice script:

```python
exec(open('shell_practice.py').read())
```

The script creates 3 users, 4 books, assigns favorites, and prints example queries showing both relationships in action.
