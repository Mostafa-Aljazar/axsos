# Dojo & Ninjas (Shell)

A Django project with two related models — `Dojo` and `Ninja`. All interaction is done through the Django shell using ORM queries. Ninjas belong to a dojo (one-to-many relationship).

---

## How to Run

```bash
cd Dojo_And_Ninjas_(Shell)
python manage.py migrate
python manage.py shell
```

---

## Models

### Dojo
| Field | Type |
|-------|------|
| name | CharField(255) |
| city | CharField(255) |
| state | CharField(2) |
| desc | TextField (default: "old dojo") |
| created_at | DateTimeField (auto) |
| updated_at | DateTimeField (auto) |

### Ninja
| Field | Type |
|-------|------|
| dojo | ForeignKey → Dojo |
| first_name | CharField(255) |
| last_name | CharField(255) |
| created_at | DateTimeField (auto) |
| updated_at | DateTimeField (auto) |

---

## Migrations

- `0001_initial` — creates Dojo and Ninja tables
- `0002_dojo_desc` — adds `desc` field to Dojo (default: "old dojo")

---

## Shell Queries

### 1. Import the models

```python
from dojo_ninjas_app.models import Dojo, Ninja
```

---

### 2. Create 3 dojos

```python
Dojo.objects.create(name="Coding Dojo Seattle", city="Seattle", state="WA")
Dojo.objects.create(name="Coding Dojo Chicago", city="Chicago", state="IL")
Dojo.objects.create(name="Coding Dojo Dallas", city="Dallas", state="TX")
```

---

### 3. Delete the 3 dojos

```python
Dojo.objects.all().delete()
```

---

### 4. Create 3 more dojos

```python
Dojo.objects.create(name="Coding Dojo Seattle", city="Seattle", state="WA")
Dojo.objects.create(name="Coding Dojo Chicago", city="Chicago", state="IL")
Dojo.objects.create(name="Coding Dojo Dallas", city="Dallas", state="TX")
```

---

### 5. Create 3 ninjas for the first dojo

```python
first_dojo = Dojo.objects.first()
Ninja.objects.create(dojo=first_dojo, first_name="Alice", last_name="Green")
Ninja.objects.create(dojo=first_dojo, first_name="Bob", last_name="White")
Ninja.objects.create(dojo=first_dojo, first_name="Carol", last_name="Brown")
```

---

### 6. Create 3 ninjas for the second dojo

```python
second_dojo = Dojo.objects.all()[1]
Ninja.objects.create(dojo=second_dojo, first_name="Dave", last_name="Black")
Ninja.objects.create(dojo=second_dojo, first_name="Eve", last_name="Stone")
Ninja.objects.create(dojo=second_dojo, first_name="Frank", last_name="Hill")
```

---

### 7. Create 3 ninjas for the third dojo

```python
third_dojo = Dojo.objects.last()
Ninja.objects.create(dojo=third_dojo, first_name="Grace", last_name="Lee")
Ninja.objects.create(dojo=third_dojo, first_name="Henry", last_name="Fox")
Ninja.objects.create(dojo=third_dojo, first_name="Isla", last_name="Park")
```

---

### 8. Retrieve all ninjas from the first dojo

```python
first_dojo.ninjas.all()
```

---

### 9. Retrieve all ninjas from the last dojo

```python
third_dojo.ninjas.all()
```

---

### 10. Retrieve the last ninja's dojo

```python
last_ninja = Ninja.objects.last()
last_ninja.dojo
```

---

### 11. Create a new dojo (after adding desc field)

```python
Dojo.objects.create(name="Coding Dojo LA", city="Los Angeles", state="CA", desc="Brand new dojo on the west coast")
```

---

## Project Structure

```
Dojo_And_Ninjas_(Shell)/
├── manage.py
├── queries.txt                  # All shell queries
├── dojo_ninjas_proj/
│   ├── settings.py
│   └── urls.py
└── dojo_ninjas_app/
    ├── models.py
    └── migrations/
        ├── 0001_initial.py
        └── 0002_dojo_desc.py
```
