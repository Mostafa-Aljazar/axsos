# Blogs Platform — ERD

## Overview

A Blogger-style platform where users can register, create blogs, invite co-admins, write posts, leave comments, upload files, and have their page visits tracked.

---

## Tables

### USERS

| Column        | Type     | Notes            |
| ------------- | -------- | ---------------- |
| id            | INT PK   |                  |
| email         | VARCHAR  | Unique           |
| first_name    | VARCHAR  |                  |
| last_name     | VARCHAR  |                  |
| password_hash | VARCHAR  | Never plain text |
| created_at    | DATETIME |                  |
| updated_at    | DATETIME |                  |

### BLOGS

| Column      | Type     | Notes      |
| ----------- | -------- | ---------- |
| id          | INT PK   |            |
| owner_id    | INT FK   | → users.id |
| name        | VARCHAR  | Blog title |
| description | TEXT     |            |
| created_at  | DATETIME |            |
| updated_at  | DATETIME |            |

### BLOG_ADMINS

| Column     | Type     | Notes      |
| ---------- | -------- | ---------- |
| id         | INT PK   |            |
| blog_id    | INT FK   | → blogs.id |
| user_id    | INT FK   | → users.id |
| invited_at | DATETIME |            |

### POSTS

| Column     | Type     | Notes      |
| ---------- | -------- | ---------- |
| id         | INT PK   |            |
| blog_id    | INT FK   | → blogs.id |
| author_id  | INT FK   | → users.id |
| title      | VARCHAR  |            |
| content    | TEXT     |            |
| created_at | DATETIME |            |
| updated_at | DATETIME |            |

### COMMENTS

| Column     | Type     | Notes      |
| ---------- | -------- | ---------- |
| id         | INT PK   |            |
| post_id    | INT FK   | → posts.id |
| author_id  | INT FK   | → users.id |
| content    | TEXT     |            |
| created_at | DATETIME |            |
| updated_at | DATETIME |            |

### FILES

| Column      | Type     | Notes          |
| ----------- | -------- | -------------- |
| id          | INT PK   |                |
| post_id     | INT FK   | → posts.id     |
| uploaded_by | INT FK   | → users.id     |
| filename    | VARCHAR  |                |
| file_path   | VARCHAR  |                |
| file_type   | VARCHAR  | jpg, pdf, etc. |
| uploaded_at | DATETIME |                |

### PAGE_VISITS

| Column           | Type     | Notes                |
| ---------------- | -------- | -------------------- |
| id               | INT PK   |                      |
| user_id          | INT FK   | → users.id           |
| page_url         | VARCHAR  | Page visited         |
| ip_address       | VARCHAR  |                      |
| visited_at       | DATETIME |                      |
| duration_seconds | INT      | How long they stayed |

---

## Relationships

```
USERS         ||--o{  BLOGS        owns
USERS         ||--o{  BLOG_ADMINS  invited as admin
BLOGS         ||--o{  BLOG_ADMINS  has admins
BLOGS         ||--o{  POSTS        contains
USERS         ||--o{  POSTS        writes
POSTS         ||--o{  COMMENTS     has
USERS         ||--o{  COMMENTS     writes
POSTS         ||--o{  FILES        has
USERS         ||--o{  FILES        uploads
USERS         ||--o{  PAGE_VISITS  generates
```

---

## Key Decisions

**`BLOG_ADMINS` is a join table** — it connects users to blogs they co-administer. A user can be admin on many blogs; a blog can have many admins. The blog owner (`blogs.owner_id`) is separate from this table — they own the blog outright.

**`PAGE_VISITS` tracks logged-in users only** — `user_id` links to the `USERS` table. The assignment asks for name, page visited, when, how long, and IP — all captured here. Duration is stored in seconds for easy math.

**`FILES` belongs to a post, not a blog** — each uploaded file is tied to a specific post, not just the blog generally. The `uploaded_by` field tracks which admin uploaded it.

**`COMMENTS` and `POSTS` both have `updated_at`** — admins can edit both, so we track when edits happened.
