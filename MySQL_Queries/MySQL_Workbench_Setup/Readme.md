# MySQL Workbench Setup — Assignment

## Overview

This assignment covers setting up MySQL Workbench, connecting to a localhost database, and practicing CRUD operations using SQL commands directly in the query editor.

---

## Setup Steps

### 1. Install MySQL Workbench

Download and install MySQL Workbench from the official MySQL website. It provides a GUI for managing databases and running SQL queries.

### 2. Connect to Localhost

- Open MySQL Workbench
- Click **"+"** next to MySQL Connections
- Fill in the connection details:
  - **Connection Name:** Local Instance
  - **Hostname:** 127.0.0.1
  - **Port:** 3306
  - **Username:** root
- Click **Test Connection**, then **OK**

### 3. Select a Database

Once connected, open a new query tab and run:

```sql
USE books_db;
```

---

## CRUD Operations

CRUD stands for the four core database operations every application needs:

| Operation  | SQL Command | Purpose                       |
| ---------- | ----------- | ----------------------------- |
| **Create** | `INSERT`    | Add new records to a table    |
| **Read**   | `SELECT`    | Retrieve records from a table |
| **Update** | `UPDATE`    | Modify existing records       |
| **Delete** | `DELETE`    | Remove records from a table   |

---

## Query Examples

### CREATE — INSERT

```sql
INSERT INTO users (name, email, password)
VALUES ('Ahmed Mohammed', 'ahmed@example.com', 'password123');

INSERT INTO books (title, author, description)
VALUES ('The Little Prince', 'Antoine de Saint-Exupery', 'A wonderful story about friendship and life');

INSERT INTO favorite_books (users_id, books_id)
VALUES (1, 1);
```

### READ — SELECT

```sql
SELECT * FROM users;

SELECT * FROM books;

SELECT id, name, email FROM users ORDER BY name ASC;

SELECT users.name, books.title, books.author
FROM users
JOIN favorite_books ON users.id = favorite_books.users_id
JOIN books ON favorite_books.books_id = books.id
WHERE users.id = 1;
```

### UPDATE — UPDATE

```sql
UPDATE users
SET name = 'Ahmed Mohammed Ali'
WHERE email = 'ahmed@example.com';

UPDATE books
SET description = 'A beautiful philosophical novel'
WHERE title = 'The Little Prince';
```

### DELETE — DELETE

```sql
DELETE FROM favorite_books
WHERE users_id = 1 AND books_id = 1;

DELETE FROM books
WHERE title = 'The Little Prince';

-- Delete a user (Be careful!)
-- DELETE FROM users WHERE email = 'test@example.com';
```
