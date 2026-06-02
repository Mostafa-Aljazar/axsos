# Great Number Game

A Django guessing game. The server picks a random number between 1 and 100 and stores it in the session. The user has up to 5 attempts to guess it. Winners can save their name to a leaderboard.

---

## Routes

| URL | Method | What it does |
|---|---|---|
| `/` | GET | Show the game. Picks a secret number if none in session yet |
| `/guess` | POST | Check the user's guess, update session, redirect to `/` |
| `/play_again` | GET | Flush the session, start a new game |
| `/save_winner` | POST | Save the winner's name to the database, redirect to leaderboard |
| `/leaderboard` | GET | Show all winners sorted by fewest attempts |

---

## Project Structure

```
Great_Number_Game/
├── manage.py
├── great_number_game_project/    # Django project config
│   ├── settings.py
│   └── urls.py
└── game/                         # The app
    ├── views.py
    ├── urls.py
    ├── models.py                 # Winner model
    ├── templates/game/
    │   ├── index.html            # Game page
    │   └── leaderboard.html      # Leaderboard page
    └── static/css/
        └── style.css
```

---

## How to Run

```bash
cd Great_Number_Game
python manage.py migrate
python manage.py runserver
```

Open `http://localhost:8000`.

---

## How It Works

When the user first visits `/`, the server picks a secret number and stores it in the session:

```python
request.session['secret_number'] = random.randint(1, 100)
request.session['attempts'] = 0
```

Each guess is checked against the secret number in `views.py`:

```python
if user_guess == secret:
    request.session['result'] = 'correct'
elif attempts >= MAX_ATTEMPTS:
    request.session['result'] = 'lose'
elif user_guess < secret:
    request.session['result'] = 'low'
else:
    request.session['result'] = 'high'
```

The template then shows a red box for too low/high, a green box for correct, or a lose message — all driven by the `result` session value.

---

## Bonuses Completed

- **Ninja:** Red box for too low/too high, green box for correct (matching the wireframe)
- **Ninja:** User can keep guessing until correct (or until attempts run out)
- **Ninja:** Attempts count is displayed on the win screen
- **Sensei:** Max 5 attempts — shows "You Lose" with the secret number if all used up
- **Sensei:** Winner can submit their name; leaderboard shows all winners sorted by fewest attempts
