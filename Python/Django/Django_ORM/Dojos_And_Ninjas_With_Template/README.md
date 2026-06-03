# Dojos & Ninjas with Template

A full-stack Django app that brings the Dojo and Ninja models into the full MTV architecture. You can add dojos, add ninjas and assign them to a dojo, view all dojos with their ninjas, and delete a dojo.

---

## How to Run

```bash
cd Dojos_And_Ninjas_With_Template
python manage.py migrate
python manage.py runserver
```

Then open `http://localhost:8000/`

---

## Features

- Add a new dojo (Name, City, State)
- Add a new ninja and assign them to a dojo via dropdown
- View all dojos with their ninjas listed underneath
- Ninja count shown next to each dojo name
- Delete a dojo (also deletes all its ninjas via CASCADE)

---

## Routes

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Show all dojos, their ninjas, and both forms |
| POST | `/create_dojo` | Save new dojo, redirect to `/` |
| POST | `/create_ninja` | Save new ninja, redirect to `/` |
| POST | `/delete_dojo/<id>` | Delete dojo and its ninjas, redirect to `/` |

---

## Models

### Dojo
```python
class Dojo(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
```

### Ninja
```python
class Ninja(models.Model):
    dojo = models.ForeignKey(Dojo, related_name='ninjas', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
```

Deleting a dojo automatically deletes all ninjas that belong to it (`CASCADE`).

---

## Project Structure

```
Dojos_And_Ninjas_With_Template/
├── manage.py
├── dojos_ninjas_proj/
│   ├── settings.py
│   └── urls.py
└── dojos_ninjas_app/
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── templates/
    │   └── dojos_ninjas_app/
    │       └── index.html
    ├── static/
    │   └── dojos_ninjas_app/
    │       └── css/
    │           └── style.css
    └── migrations/
        └── 0001_initial.py
```
