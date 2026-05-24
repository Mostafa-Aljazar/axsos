# Books — ERD Assignment

## Overview

This assignment models a database for an application that tracks users, books, and each user's list of favorite books. Each book stores its author directly in the record as permitted by the assignment specification.

---

## ERD Summary

The database is modeled with **3 entities**:

| Entity           | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `users`          | A registered user of the application                       |
| `books`          | A book with a title, author, description, and cover image  |
| `favorite_books` | Junction table linking users to their saved favorite books |

### Relationships

- A **User** can save many **Books** as favorites (`many-to-many`)
- A **Book** can be saved by many **Users** (`many-to-many`)
- The `favorite_books` table resolves this into two `one-to-many` relationships

---

## Entity Details

### users

| Field      | Type         | Notes                       |
| ---------- | ------------ | --------------------------- |
| `id`       | INT          | Primary key, auto-increment |
| `email`    | VARCHAR(255) | Unique, used for login      |
| `password` | VARCHAR(255) | Hashed password             |
| `name`     | VARCHAR(255) | Display name of the user    |

### books

| Field         | Type         | Notes                                          |
| ------------- | ------------ | ---------------------------------------------- |
| `id`          | INT          | Primary key, auto-increment                    |
| `title`       | VARCHAR(255) | Title of the book                              |
| `author`      | VARCHAR(255) | Author name (denormalized per assignment spec) |
| `description` | TEXT         | Book description or synopsis                   |
| `image_url`   | VARCHAR(255) | URL of the book cover image                    |

### favorite_books

| Field      | Type     | Notes                                  |
| ---------- | -------- | -------------------------------------- |
| `users_id` | INT      | FK → users (singular as required)      |
| `books_id` | INT      | FK → books (singular as required)      |
| `added_at` | DATETIME | Timestamp when the user saved the book |

---

## Notes

- The `author` field is stored directly in the `books` table as specified by the assignment. In a more normalized design, authors would have their own table with a foreign key relationship.
- Foreign keys are named in **singular form** (`users_id`, `books_id`) as per assignment conventions.
- The `added_at` field in `favorite_books` records exactly when a user added a book to their favorites list, enabling sorting by most recently saved.
- A composite primary key on `(users_id, books_id)` prevents a user from saving the same book more than once.
