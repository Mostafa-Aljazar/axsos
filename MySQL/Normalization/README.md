# Normalization — ERD Assignment

## Overview

This assignment takes a denormalized ERD that tracks students and dojos, and recreates it so that it satisfies all three Normal Forms (1NF, 2NF, and 3NF).

---

## Original ERD (Unnormalized)

The original schema had two tables with the following violations:

| Table      | Field            | Violation | Reason                                                 |
| ---------- | ---------------- | --------- | ------------------------------------------------------ |
| `students` | `interests TEXT` | **1NF**   | Stores multiple values in a single field               |
| `students` | `name VARCHAR`   | **1NF**   | Not atomic — combines first and last name              |
| `students` | `dojo_id INT`    | **2NF**   | Limits a student to one dojo; should be a relationship |

---

## Normalization Steps

### Step 1 — 1NF (First Normal Form)

**Rule:** Every field must hold a single atomic value. No repeating groups or multi-valued fields.

**Changes:**

- Split `name` into `first_name` and `last_name`
- Removed `interests TEXT` and created a separate `interests` table
- Added `students_has_interests` junction table to handle the many-to-many relationship

### Step 2 — 2NF (Second Normal Form)

**Rule:** No partial dependencies — every non-key field must depend on the full primary key.

**Changes:**

- Removed `dojo_id` from `students` (a student should not be locked to one dojo)
- Created `students_has_dojos` junction table to introduce a proper many-to-many relationship between students and dojos

### Step 3 — 3NF (Third Normal Form)

**Rule:** No transitive dependencies — non-key fields must depend only on the primary key.

**Result:** All non-key fields in every table depend only on their own table's primary key — no transitive dependencies remain.

---

## Final ERD Summary

The normalized database has **5 entities**:

| Entity                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `dojos`                  | A martial arts school                                    |
| `students`               | A student with atomic name and address fields            |
| `interests`              | A single interest extracted from the original TEXT field |
| `students_has_dojos`     | Junction table — student ↔ dojo (many-to-many)           |
| `students_has_interests` | Junction table — student ↔ interest (many-to-many)       |

### Relationships

- A **Student** can attend many **Dojos**, and a **Dojo** can have many **Students** (via `students_has_dojos`)
- A **Student** can have many **Interests**, and an **Interest** can belong to many **Students** (via `students_has_interests`)

---

## Entity Details

### dojos

| Field        | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `id`         | INT          | Primary key, auto-increment |
| `name`       | VARCHAR(255) | Dojo name (unique)          |
| `location`   | VARCHAR(255) | Dojo location               |
| `created_at` | DATETIME     | Record creation timestamp   |
| `updated_at` | DATETIME     | Record update timestamp     |

### students

| Field        | Type         | Notes                                           |
| ------------ | ------------ | ----------------------------------------------- |
| `id`         | INT          | Primary key, auto-increment                     |
| `first_name` | VARCHAR(255) | Student first name (split from original `name`) |
| `last_name`  | VARCHAR(255) | Student last name (split from original `name`)  |
| `address1`   | VARCHAR(255) | Primary address line                            |
| `address2`   | VARCHAR(255) | Secondary address line                          |
| `created_at` | DATETIME     | Record creation timestamp                       |
| `updated_at` | DATETIME     | Record update timestamp                         |

### interests

| Field  | Type         | Notes                                      |
| ------ | ------------ | ------------------------------------------ |
| `id`   | INT          | Primary key, auto-increment                |
| `name` | VARCHAR(255) | Interest name (e.g. coding, music, sports) |

### students_has_dojos

| Field         | Type | Notes                                |
| ------------- | ---- | ------------------------------------ |
| `students_id` | INT  | FK → students (singular as required) |
| `dojos_id`    | INT  | FK → dojos (singular as required)    |

### students_has_interests

| Field          | Type | Notes                                 |
| -------------- | ---- | ------------------------------------- |
| `students_id`  | INT  | FK → students (singular as required)  |
| `interests_id` | INT  | FK → interests (singular as required) |

---

## Summary of All Changes

| #   | Change                                                                | Normal Form Fixed |
| --- | --------------------------------------------------------------------- | ----------------- |
| 1   | Split `name` into `first_name` and `last_name`                        | 1NF               |
| 2   | Extracted `interests TEXT` into a separate `interests` table          | 1NF               |
| 3   | Added `students_has_interests` junction for student ↔ interest        | 1NF               |
| 4   | Removed `dojo_id` from `students`                                     | 2NF               |
| 5   | Added `students_has_dojos` junction for student ↔ dojo (many-to-many) | 2NF / 3NF         |

---

## Notes

- The new type of relationship introduced (as hinted by the assignment) is the **many-to-many** between `students` and `dojos`, replacing the original one-to-many `dojo_id` foreign key.
- All junction tables follow the MySQL Workbench naming convention: `table1_has_table2`.
- Foreign keys are named in **singular form** (`students_id`, `dojos_id`, `interests_id`) as per assignment conventions.
