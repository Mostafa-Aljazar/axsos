# Dojo Survey

A Django web app that collects survey data through a form and displays the submitted information on a results page.

---

## What It Does

- **`/`** — shows a survey form
- **`/result`** — shows the information the user just submitted (via POST)

---

## Project Structure

```
Dojo_Survey/
├── manage.py
├── dojo_survey_project/       # Django project config
│   ├── settings.py
│   └── urls.py
└── survey/                    # The app
    ├── views.py
    ├── urls.py
    ├── templates/survey/
    │   ├── index.html         # Survey form
    │   └── result.html        # Results page
    └── static/css/
        └── style.css
```

---

## How to Run

Make sure you have Django installed (and your virtual environment active), then:

```bash
cd Dojo_Survey
python manage.py migrate
python manage.py runserver
```

Open your browser at `http://localhost:8000`.

---

## Form Fields

| Field | Type | Description |
|---|---|---|
| Full Name | Text input | The user's name |
| Dojo Location | Radio buttons | Which Dojo campus |
| Languages | Checkboxes | Programming languages they know |
| Comment | Textarea | Any extra thoughts |

---

## How the POST Works

The form sends a `POST` request to `/result`. In `views.py`, we read the submitted data like this:

```python
name      = request.POST.get('name', '')
location  = request.POST.get('location', '')
languages = request.POST.getlist('languages')   # checkboxes return a list
comment   = request.POST.get('comment', '')
```

We then pass those values into the template as `context` and render `result.html`.

> **Note:** The form uses `{% csrf_token %}` — Django requires this on every POST form as a security measure.

---

## Bonuses Completed

- **Ninja:** CSS styling (custom stylesheet, clean card layout)
- **Ninja:** Radio buttons for Dojo location
- **Sensei:** Checkboxes for programming languages
