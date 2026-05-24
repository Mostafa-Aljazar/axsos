# Likes — ERD Assignment

## Overview

This assignment models a database for a platform where users can create posts and like posts made by others. The ERD was built from the wireframe and the MySQL Workbench file (`Likes_Assignment.mwb`).

---

## Step 1 — Tables Identified from the Wireframe

| Table   | Why it's needed                                                           |
| ------- | ------------------------------------------------------------------------- |
| `users` | Users must register and log in to the platform                            |
| `posts` | Users create posts with a body and optional image                         |
| `likes` | Users can like posts — a separate table is needed to track who liked what |

---

## Step 2 — Relationships & Foreign Keys

All foreign keys are named in **singular form** as required:

| Foreign Key | Table   | References |
| ----------- | ------- | ---------- |
| `users_id`  | `posts` | `users.id` |
| `users_id`  | `likes` | `users.id` |
| `posts_id`  | `likes` | `posts.id` |

### Relationships

- A **User** can create many **Posts** (`one-to-many`)
- A **User** can give many **Likes** (`one-to-many`)
- A **Post** can receive many **Likes** (`one-to-many`)

---

## Entity Details

### users

| Field        | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | Primary key, auto-increment |
| `email`      | VARCHAR(255) | Unique, used for login      |
| `password`   | VARCHAR(255) | Hashed password             |
| `first_name` | VARCHAR(255) | User first name             |
| `last_name`  | VARCHAR(255) | User last name              |
| `created_at` | DATETIME     | Record creation timestamp   |
| `updated_at` | DATETIME     | Record update timestamp     |

### posts

| Field        | Type         | Notes                               |
| ------------ | ------------ | ----------------------------------- |
| `id`         | INT          | Primary key, auto-increment         |
| `users_id`   | INT          | FK → users (singular as required)   |
| `body`       | TEXT         | Post content                        |
| `image_url`  | VARCHAR(255) | Optional image attached to the post |
| `created_at` | DATETIME     | Record creation timestamp           |
| `updated_at` | DATETIME     | Record update timestamp             |

### likes

| Field        | Type     | Notes                             |
| ------------ | -------- | --------------------------------- |
| `id`         | INT      | Primary key, auto-increment       |
| `users_id`   | INT      | FK → users (singular as required) |
| `posts_id`   | INT      | FK → posts (singular as required) |
| `created_at` | DATETIME | Record creation timestamp         |
| `updated_at` | DATETIME | Record update timestamp           |

---

## Notes

- The `likes` table acts as a junction between `users` and `posts`, recording exactly which user liked which post.
- Foreign keys are intentionally named in singular form (`users_id`, `posts_id`) as required by the assignment instructions.
- A unique constraint on `(users_id, posts_id)` in the `likes` table can be added to prevent a user from liking the same post more than once.
