# Users (Shell)

A Django project with a single `User` model. All interaction is done through the Django shell using ORM queries — no views or templates needed.

---

## How to Run

```bash
cd Users_(Shell)
python manage.py migrate
python manage.py shell
```

---

## The Model

```python
class User(models.Model):
    first_name    = models.CharField(max_length=255)
    last_name     = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)
    age           = models.IntegerField()
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}: {self.first_name} {self.last_name} - {self.email_address} - {self.age}"
```

- `auto_now_add=True` — sets `created_at` once when the record is first saved
- `auto_now=True` — updates `updated_at` automatically every time `.save()` is called
- `__str__` — makes shell output readable: `1: John Smith - john@email.com - 25`

---

## Shell Queries

### 1. Import the model

```python
from users_app.models import User
```

---

### 2. Create 3 new users

```python
User.objects.create(first_name="John", last_name="Smith", email_address="john@email.com", age=25)
User.objects.create(first_name="Jane", last_name="Doe", email_address="jane@email.com", age=30)
User.objects.create(first_name="Bob", last_name="Brown", email_address="bob@email.com", age=22)
```

---

### 3. Retrieve all users

```python
User.objects.all()
```

---

### 4. Retrieve the last user

```python
User.objects.last()
```

---

### 5. Retrieve the first user

```python
User.objects.first()
```

---

### 6. Change user with id=3 last name to "Pancakes"

```python
user = User.objects.get(id=3)
user.last_name = "Pancakes"
user.save()
```

---

### 7. Delete the user with id=2

```python
user = User.objects.get(id=2)
user.delete()
```

---

### 8. Get all users sorted by first name (A → Z)

```python
User.objects.all().order_by('first_name')
```

---

### BONUS: Get all users sorted by first name (Z → A)

```python
User.objects.all().order_by('-first_name')
```

> The `-` prefix reverses the sort direction.

---

## Project Structure

```
Users_(Shell)/
├── manage.py
├── queries.txt              # All shell queries in one file
├── single_model_orm/
│   ├── settings.py
│   └── urls.py
└── users_app/
    ├── models.py
    └── migrations/
        └── 0001_initial.py
```
