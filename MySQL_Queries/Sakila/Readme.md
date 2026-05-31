# Assignment: Sakila Database Queries

## Setup

Run these two files in MySQL Workbench **in order**:

1. `sakila-schema.sql` — creates all the tables
2. `sakila-data.sql` — fills the tables with data

```sql
USE sakila;
```

---

## Queries

---

### 1. What query would you run to get all the customers inside city_id = 312?

Your query should return the customer's first name, last name, email, and address.

```sql
SELECT customer.first_name, customer.last_name, customer.email, address.address
FROM customer
JOIN address ON customer.address_id = address.address_id
WHERE address.city_id = 312;
```

**Path:** `customer → address` (via `address_id`)

---

### 2. What query would you run to get all comedy films?

Your query should return the film title, description, release year, rating, special features, and genre (category).

```sql
SELECT film.title, film.description, film.release_year, film.rating, film.special_features, category.name AS genre
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category      ON film_category.category_id = category.category_id
WHERE category.name = 'Comedy';
```

**Path:** `film → film_category → category`

`film_category` is the bridge table that connects films to their genres.

---

### 3. What query would you run to get all the films joined by actor_id = 5?

Your query should return the actor ID, name, film title, description, and release year.

```sql
SELECT actor.actor_id, actor.first_name, actor.last_name, film.title, film.description, film.release_year
FROM actor
JOIN film_actor ON actor.actor_id = film_actor.actor_id
JOIN film       ON film_actor.film_id = film.film_id
WHERE actor.actor_id = 5;
```

**Path:** `actor → film_actor → film`

`film_actor` is the bridge table between actors and films (many-to-many).

---

### 4. What query would you run to get all the customers in store_id = 1 and inside these cities (1, 42, 312, and 459)?

Your query should return the customer's first name, last name, email, and address.

```sql
SELECT customer.first_name, customer.last_name, customer.email, address.address
FROM customer
JOIN address ON customer.address_id = address.address_id
WHERE customer.store_id = 1
  AND address.city_id IN (1, 42, 312, 459);
```

**`IN (1, 42, 312, 459)`** is cleaner than writing four separate `OR` conditions.

---

### 5. What query would you run to get all the films with a "rating = G" and "special feature = behind the scenes", joined by actor_id = 15?

Your query should return the film title, description, release year, rating, and special feature.

```sql
SELECT film.title, film.description, film.release_year, film.rating, film.special_features
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
WHERE film.rating = 'G'
  AND film.special_features LIKE '%Behind the Scenes%'
  AND film_actor.actor_id = 15;
```

**`LIKE '%Behind the Scenes%'`** — `special_features` stores multiple values in one field like `"Trailers,Behind the Scenes,Deleted Scenes"`. The `%` wildcards match it anywhere in the string.

---

### 6. What query would you run to get all the actors joining the film_id = 369?

Your query should return the film_id, title, actor_id, and actor_name.

```sql
SELECT film.film_id, film.title, actor.actor_id, actor.first_name, actor.last_name
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor      ON film_actor.actor_id = actor.actor_id
WHERE film.film_id = 369;
```

---

### 7. What query would you run to get all drama films with a rental rate of 2.99?

Your query should return the film title, description, release year, rating, special features, and genre (category).

```sql
SELECT film.title, film.description, film.release_year, film.rating, film.special_features, category.name AS genre
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category      ON film_category.category_id = category.category_id
WHERE category.name = 'Drama'
  AND film.rental_rate = 2.99;
```

---

### 8. What query would you run to get all the action films joined by SANDRA KILMER?

Your query should return the film title, description, release year, rating, special features, genre (category), and actor's first and last name.

```sql
SELECT film.title, film.description, film.release_year, film.rating, film.special_features,
       category.name AS genre, actor.first_name, actor.last_name
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category      ON film_category.category_id = category.category_id
JOIN film_actor    ON film.film_id = film_actor.film_id
JOIN actor         ON film_actor.actor_id = actor.actor_id
WHERE category.name = 'Action'
  AND actor.first_name = 'SANDRA'
  AND actor.last_name  = 'KILMER';
```

**Four JOINs** — film connects to both category and actor at the same time through their bridge tables.

---

## JOIN Count Per Query

| Query | JOINs | Tables Connected                |
| ----- | ----- | ------------------------------- |
| 1     | 1     | customer → address              |
| 2     | 2     | film → film_category → category |
| 3     | 2     | actor → film_actor → film       |
| 4     | 1     | customer → address              |
| 5     | 1     | film → film_actor               |
| 6     | 2     | film → film_actor → actor       |
| 7     | 2     | film → film_category → category |
| 8     | 4     | film → category + film → actor  |

---

## Key SQL Concepts Used

| Concept            | Where Used         |
| ------------------ | ------------------ |
| `JOIN`             | All queries        |
| `WHERE` with `AND` | Queries 4, 5, 7, 8 |
| `IN (...)`         | Query 4            |
| `LIKE '%...%'`     | Query 5            |
| `AS` alias         | Queries 2, 6, 7, 8 |

---

## Files Included

| File                 | Description                         |
| -------------------- | ----------------------------------- |
| `sakila-schema.sql`  | Creates all tables — run this first |
| `sakila-data.sql`    | Inserts all data — run this second  |
| `sakila_queries.sql` | All 8 assignment queries            |
