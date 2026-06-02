# Great Number Game

A Django guessing game. The server picks a random number between 1 and 100 and stores it in the session. The user has up to 5 attempts to guess it. Winners are saved to a session-based leaderboard.

---

## Routes

| URL | Method | What it does |
|---|---|---|
| `/` | GET | Show the game. Picks a secret number if none in session yet |
| `/guess` | POST | Check the user's guess, update session, redirect to `/` |
| `/play_again` | GET | Reset the game while keeping the leaderboard |
| `/save_winner` | POST | Save the winner's name to the session, redirect to leaderboard |
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

Each guess is checked in `views.py` and the result is stored in the session:

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

The template reads `result` from the context and shows a red box for too low/high, green for correct, or a lose message.

### Session Keys

| Key | Description |
|---|---|
| `secret_number` | The randomly picked number |
| `attempts` | How many guesses the user has made |
| `result` | Current game state: `None`, `'low'`, `'high'`, `'correct'`, `'lose'` |
| `winners` | List of `{'name': ..., 'attempts': ...}` dicts for the leaderboard |

### Saving Winners

When the user wins and submits their name, it's appended to the `winners` list in the session — no database needed:

```python
winners = request.session.get('winners', [])
winners.append({'name': name, 'attempts': attempts})
request.session['winners'] = winners
```

When the user clicks "Play again", the `winners` list is preserved so the leaderboard survives across games.

> **Note:** If you store a list in the session and then modify it in place (e.g. with `append()`), Django may not detect the change automatically. Always re-assign the key or call `request.session.save()` to make sure the change is persisted:
>
> ```python
> request.session['my_list'] = []
> request.session['my_list'].append("new item")
> request.session.save()
> ```

---

## Bonuses Completed

- **Ninja:** Red box for too low/too high, green box for correct
- **Ninja:** User keeps guessing until correct or out of attempts
- **Ninja:** Attempts count shown on the win screen
- **Sensei:** Max 5 attempts — shows "You Lose" with the secret number revealed
- **Sensei:** Winner submits name; leaderboard shows all session winners sorted by fewest attempts
