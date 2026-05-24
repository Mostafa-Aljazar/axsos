# Amazon — Product Categories ERD Assignment

## Overview

This assignment models a database for a product browsing platform similar to Amazon. Based on the wireframe, users can browse products filtered by **Brand**, **Category**, or **Character** using a tab navigation system.

---

## Wireframe Analysis

The wireframe shows a **Product Categories** page with three browse tabs:

| Tab           | Purpose                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| **Brand**     | Browse products by manufacturer or brand                                                    |
| **Category**  | Browse products by type (e.g. Action Figures → Accessories, Collectibles, Animals, Robots…) |
| **Character** | Browse products by associated character                                                     |

Each tab represents a dimension by which a product can be classified — meaning a product belongs to one brand, one category, and one character.

---

## ERD Summary

The database is modeled with **4 entities**:

| Entity      | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `brand`     | The manufacturer or brand of a product                          |
| `category`  | The product category (e.g. Action Figures, Accessories, Robots) |
| `character` | The character associated with a product                         |
| `product`   | The core product, linked to a brand, category, and character    |

### Relationships

- A **Brand** makes many **Products** (`one-to-many`)
- A **Category** groups many **Products** (`one-to-many`)
- A **Character** features in many **Products** (`one-to-many`)
- Each **Product** belongs to exactly one brand, one category, and one character

---

## Entity Details

### brand

| Field  | Type         | Notes                       |
| ------ | ------------ | --------------------------- |
| `id`   | INT          | Primary key, auto-increment |
| `name` | VARCHAR(255) | Brand name                  |

### category

| Field  | Type         | Notes                                             |
| ------ | ------------ | ------------------------------------------------- |
| `id`   | INT          | Primary key, auto-increment                       |
| `name` | VARCHAR(255) | Category name (e.g. Accessories, Robots, Animals) |

### character

| Field  | Type         | Notes                       |
| ------ | ------------ | --------------------------- |
| `id`   | INT          | Primary key, auto-increment |
| `name` | VARCHAR(255) | Character name              |

### product

| Field          | Type         | Notes                                 |
| -------------- | ------------ | ------------------------------------- |
| `id`           | INT          | Primary key, auto-increment           |
| `brand_id`     | INT          | FK → brand (singular as required)     |
| `category_id`  | INT          | FK → category (singular as required)  |
| `character_id` | INT          | FK → character (singular as required) |
| `name`         | VARCHAR(255) | Product name                          |
| `price`        | DECIMAL      | Product price                         |

---

## Notes

- Foreign keys are named in **singular form** (`brand_id`, `category_id`, `character_id`) as per assignment conventions.
- The three browse tabs in the wireframe (Brand, Category, Character) map directly to the three lookup tables in the schema.
- The subcategories shown in the wireframe (e.g. "All Action Figures", "Collectibles", "Accessories"…) are all rows inside the `category` table — no separate subcategory table is needed for this model.
- `category_id` and `character_id` on `product` can be made nullable if a product doesn't always have an associated character or subcategory.
