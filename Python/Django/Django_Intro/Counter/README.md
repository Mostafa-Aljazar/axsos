# Counter

A Django app that uses the **session** to track how many times a client has visited the page, plus a manual counter that the user can increment.

---

## Routes

| URL | Method | What it does |
|---|---|---|
| `/` | GET | Show page visits and counter value |
| `/increment_two` | GET | Add 2 to the counter, redirect to `/` |
| `/increment_custom` | POST | Add a user-specified amount to the counter, redirect to `/` |
| `/destroy_session` | GET | Clear the session, redirect to `/` |

---

## Project Structure

```
Counter/
├── manage.py
├── counter_project/       # Django project config
│   ├── settings.py
│   └── urls.py
└── counter/               # The app
    ├── views.py
    ├── urls.py
    ├── templates/counter/
    │   └── index.html
    └── static/css/
        └── style.css
```

---

## How to Run

```bash
cd Counter
python manage.py migrate
python manage.py runserver
```

Open `http://localhost:8000` in your browser.

---

## How the Session Works

Django stores session data on the server and gives each browser a cookie to identify itself. We use two session keys:

| Key | Description |
|---|---|
| `visits` | Increments by 1 every time the root route is loaded |
| `counter` | Manually incremented via the +2 button or the custom form |

```python
# Check before using — session keys may not exist yet
if 'visits' not in request.session:
    request.session['visits'] = 0

request.session['visits'] += 1

# Wipe everything
request.session.flush()
```

---

## Bonuses Completed

- **Ninja:** Reset button → hits `/destroy_session` and clears the session
- **Ninja:** +2 button → hits `/increment_two` and adds 2 to the counter
- **Sensei:** Custom increment form → POST to `/increment_custom` with a user-chosen number
- **Sensei:** Both `visits` (page loads) and `counter` (manual increments) are displayed separately
