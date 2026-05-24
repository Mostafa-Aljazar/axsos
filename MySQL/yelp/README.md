# Food Reviews (Yelp) — ERD Assignment

## Overview

This assignment models a database for a food review platform similar to Yelp. Based on the wireframe, users can browse restaurants, view star ratings, review counts, and read written reviews left by other users.

---

## Wireframe Analysis

The wireframe shows a **Restaurants** listing where each entry displays:

- Restaurant name (e.g. Red Hot Wok, OG Sliders, Ike's Lair)
- Star rating and total review count (e.g. 581 reviews)
- Reviewer profile image
- Written review comment

This tells us we need to track **restaurants**, **users** (reviewers), and **reviews** that link the two.

---

## ERD Summary

The database is modeled with **3 entities**:

| Entity        | Description                                   |
| ------------- | --------------------------------------------- |
| `users`       | A registered user who can write reviews       |
| `restaurants` | A restaurant that can be reviewed             |
| `reviews`     | A review written by a user about a restaurant |

### Relationships

- A **User** can write many **Reviews** (`one-to-many`)
- A **Restaurant** can receive many **Reviews** (`one-to-many`)
- A **Review** belongs to exactly one **User** and one **Restaurant**

---

## Entity Details

### users

| Field        | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | Primary key, auto-increment |
| `email`      | VARCHAR(255) | Unique, used for login      |
| `password`   | VARCHAR(255) | Hashed password             |
| `created_at` | DATETIME     | Record creation timestamp   |
| `updated_at` | DATETIME     | Record update timestamp     |

### restaurants

| Field        | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | Primary key, auto-increment |
| `name`       | VARCHAR(255) | Restaurant name             |
| `address`    | VARCHAR(255) | Restaurant address          |
| `image_url`  | VARCHAR(255) | Restaurant photo URL        |
| `created_at` | DATETIME     | Record creation timestamp   |
| `updated_at` | DATETIME     | Record update timestamp     |

### reviews

| Field            | Type     | Notes                                   |
| ---------------- | -------- | --------------------------------------- |
| `id`             | INT      | Primary key, auto-increment             |
| `users_id`       | INT      | FK → users (singular as required)       |
| `restaurants_id` | INT      | FK → restaurants (singular as required) |
| `rating`         | INT      | Star rating (1–5)                       |
| `comment`        | TEXT     | Written review text                     |
| `created_at`     | DATETIME | Record creation timestamp               |
| `updated_at`     | DATETIME | Record update timestamp                 |

---

## Notes

- Foreign keys are named in **singular form** (`users_id`, `restaurants_id`) as per assignment conventions.
- The review count shown in the wireframe (e.g. "581 reviews") is derived at the application level by counting reviews per restaurant — it is not stored as a field.
- The star rating display in the wireframe maps to the `rating` INT field, expected values 1–5.
- The reviewer profile image shown in the wireframe would be stored as a field on the `users` table if extended (e.g. `image_url`).
