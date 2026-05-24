# Belt Certifications — ERD Assignment

## Overview

This assignment models a database for a belt certification tracking platform. Based on the wireframe, the app displays a table of students alongside the belt colors they have earned.

---

## Wireframe Analysis

The wireframe shows a simple certification table:

| Name       | Belts              |
| ---------- | ------------------ |
| Andrew Lee | yellow, red, black |
| Jay Patel  | yellow, red, black |
| Kobe       | yellow             |

Since one student can earn multiple belts and the same belt color can be earned by many students, this is a **many-to-many relationship** that requires a junction table.

---

## ERD Summary

The database is modeled with **3 entities**:

| Entity               | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `students`           | A student enrolled in the certification program       |
| `belts`              | A belt color that can be earned                       |
| `students_has_belts` | Junction table linking students to their earned belts |

### Relationships

- A **Student** can earn many **Belts** (`many-to-many`)
- A **Belt** can be earned by many **Students** (`many-to-many`)
- The `students_has_belts` table resolves this into two `one-to-many` relationships

---

## Entity Details

### students

| Field  | Type         | Notes                       |
| ------ | ------------ | --------------------------- |
| `id`   | INT          | Primary key, auto-increment |
| `name` | VARCHAR(255) | Student full name           |

### belts

| Field   | Type         | Notes                                |
| ------- | ------------ | ------------------------------------ |
| `id`    | INT          | Primary key, auto-increment          |
| `color` | VARCHAR(255) | Belt color (e.g. yellow, red, black) |

### students_has_belts

| Field         | Type | Notes                                |
| ------------- | ---- | ------------------------------------ |
| `students_id` | INT  | FK → students (singular as required) |
| `belts_id`    | INT  | FK → belts (singular as required)    |

---

## Notes

- The junction table `students_has_belts` is the standard MySQL Workbench naming convention for many-to-many relationships between two tables.
- Foreign keys are named in **singular form** (`students_id`, `belts_id`) as per assignment conventions.
- The belt colors shown in the wireframe (yellow → red → black) follow a progression, but ordering logic is handled at the application level — no order field is needed in the database.
- A composite primary key on `(students_id, belts_id)` prevents a student from being awarded the same belt color more than once.
