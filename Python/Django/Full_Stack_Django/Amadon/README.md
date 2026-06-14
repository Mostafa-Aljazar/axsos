# Amadon

A simple e-commerce demo built with Django. Choose a product, pick a quantity, and buy it. The checkout page shows your most recent charge and your running totals.

---

## Key Lessons

**No render after POST** — The buy route only processes the order and redirects. It never renders HTML. This means refreshing the checkout page won't accidentally re-submit the order.

**No price in the form** — The form only sends `product_id` and `quantity`. The server looks up the real price from the database. A user cannot change the price through the browser's inspect tool.

---

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/amadon/` | Show all products with buy forms |
| POST | `/amadon/buy` | Place an order → redirect to checkout |
| GET | `/amadon/checkout` | Thank you page with order totals |

---

## Models

**Product**

| Field | Type |
|-------|------|
| `name` | CharField |
| `price` | DecimalField |
| `created_at` | DateTimeField (auto) |
| `updated_at` | DateTimeField (auto) |

**Order**

| Field | Type |
|-------|------|
| `product` | ForeignKey → Product |
| `quantity` | IntegerField |
| `created_at` | DateTimeField (auto) |
| `updated_at` | DateTimeField (auto) |

---

## Checkout Page Shows

- The charge for the **most recent order**
- **Total quantity** of all orders combined
- **Total amount spent** across all orders

---

## Setup

```bash
source django_venv/Scripts/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Seed the database with products from the shell:

```python
python manage.py shell
from amadon_app.models import Product
Product.objects.create(name='Dojo Tshirt', price=19.99)
Product.objects.create(name='Dojo Sweater', price=29.99)
Product.objects.create(name='Dojo Cup', price=4.99)
Product.objects.create(name='Algorithm Book', price=49.99)
```

Then open [http://127.0.0.1:8000/amadon/](http://127.0.0.1:8000/amadon/)
