# Ninja Gold

A Django mini-game where a ninja earns (or loses) gold by visiting different locations. Gold, move count, and the activity log are all stored in the session — no database needed.

---

## How to Run

```bash
cd Ninja_Gold
python manage.py migrate
python manage.py runserver
```

Open `http://localhost:8000`.

---

## Routes

| URL | Method | What it does |
|---|---|---|
| `/` | GET | Main game page — shows gold, location cards, and activity log |
| `/process_money/<location>` | POST | Calculates gold for the location, updates session, redirects to `/` |
| `/setup` | GET | Win conditions form (Sensei bonus) |
| `/start_game` | POST | Saves win conditions to session, starts the game |
| `/reset` | GET | Clears the session and restarts |

---

## Locations & Gold

| Location | Gold Earned |
|---|---|
| Farm | +10 to +20 |
| Cave | +10 to +20 |
| House | +10 to +20 |
| Quest | -50 to +50 (random — can lose!) |

---

## Project Structure

```
Ninja_Gold/
├── manage.py
├── ninja_gold_project/
│   ├── settings.py
│   └── urls.py
└── gold/
    ├── views.py
    ├── urls.py
    ├── templates/gold/
    │   ├── index.html       # Main game page
    │   └── setup.html       # Win conditions setup page
    └── static/css/
        └── style.css
```

---

## Session Keys

| Key | Description |
|---|---|
| `gold` | The ninja's current gold total |
| `moves` | Number of moves made so far |
| `activities` | List of activity log entries |
| `max_moves` | Move limit (set on setup page) |
| `goal` | Gold target to win (set on setup page) |

> **Note:** After modifying a list stored in the session, always call `request.session.save()` — Django won't detect in-place changes automatically.

---

## Bonuses Completed

- **Ninja:** Location is passed in the URL (`/process_money/farm`) instead of a hidden input field
- **Sensei:** `/setup` lets the user set a gold goal and move limit before playing — the game tracks progress and shows a win/lose banner when the conditions are met
