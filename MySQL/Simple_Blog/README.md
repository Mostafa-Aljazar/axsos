# Simple Blog — ERD Assignment

## Overview

This assignment models a database for a simple blogging platform based on the wireframe provided. The platform supports user registration, login, creating posts, and adding comments to posts.

---

## Wireframe Summary

The wireframe shows two main pages:

**Page 1 — Auth**

- Log In form (email, password)
- Registration form (email, password, password confirmation)

**Page 2 — Blog**

- Posts list with a "Create New" button
- Each post displays: author name, time posted, and content
- Each post has a Comments section showing: commenter name, time posted, and comment content

---

## ERD Summary

The database is modeled with **3 entities**:

| Entity    | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `USER`    | A registered user who can log in, create posts, and comment |
| `POST`    | A blog post created by a user                               |
| `COMMENT` | A comment left on a post by a user                          |

### Relationships

- A **User** can create many **Posts** (`one-to-many`)
- A **User** can write many **Comments** (`one-to-many`)
- A **Post** can have many **Comments** (`one-to-many`)

---

## Entity Details

### USER

| Field        | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | Primary key, auto-increment |
| `email`      | VARCHAR(150) | Unique, used for login      |
| `password`   | VARCHAR(255) | Hashed password             |
| `created_at` | DATETIME     | Registration timestamp      |
| `updated_at` | DATETIME     | Last update timestamp       |

### POST

| Field        | Type     | Notes                       |
| ------------ | -------- | --------------------------- |
| `id`         | INT      | Primary key, auto-increment |
| `user_id`    | INT      | FK → USER (the author)      |
| `content`    | TEXT     | Post body content           |
| `created_at` | DATETIME | Post creation timestamp     |
| `updated_at` | DATETIME | Last update timestamp       |

### COMMENT

| Field        | Type     | Notes                       |
| ------------ | -------- | --------------------------- |
| `id`         | INT      | Primary key, auto-increment |
| `user_id`    | INT      | FK → USER (the commenter)   |
| `post_id`    | INT      | FK → POST                   |
| `content`    | TEXT     | Comment body content        |
| `created_at` | DATETIME | Comment creation timestamp  |
| `updated_at` | DATETIME | Last update timestamp       |

---

## Notes

- The `user_id` on both `POST` and `COMMENT` allows the app to display the author's name next to each entry, as shown in the wireframe ("Posted by: Andrew, 3 hours ago").
- Passwords should always be stored as hashed values — never plain text.
- `updated_at` is included on all tables to track edits over time.
