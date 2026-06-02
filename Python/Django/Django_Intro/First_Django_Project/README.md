# Assignment: First Django Project

## Setup

Make sure Django is installed, then run:

```bash
python manage.py migrate
python manage.py runserver
```

Open your browser at `http://localhost:8000`

---

## Routes

---

### 1. `/` — Redirects to `/blogs`

Method name: `root`

```python
def root(request):
    return redirect('/blogs')
```

**Behavior:** Any visit to the root URL is immediately redirected to `/blogs`.

---

### 2. `/blogs` — List all blogs

Method name: `index`

```python
def index(request):
    return HttpResponse("placeholder to later display a list of all blogs")
```

---

### 3. `/blogs/new` — New blog form

Method name: `new`

```python
def new(request):
    return HttpResponse("placeholder to display a new form to create a new blog")
```

---

### 4. `/blogs/create` — Create a blog

Method name: `create`

```python
def create(request):
    return redirect('/')
```

**Behavior:** Redirects back to `/` after creation.

---

### 5. `/blogs/<number>` — Show a single blog

Method name: `show`

```python
def show(request, number):
    return HttpResponse(f"placeholder to display blog number: {number}")
```

**Example:** `localhost:8000/blogs/15` → `placeholder to display blog number: 15`

`<int:number>` is a route parameter — Django captures the number from the URL and passes it into the view.

---

### 6. `/blogs/<number>/edit` — Edit a blog

Method name: `edit`

```python
def edit(request, number):
    return HttpResponse(f"placeholder to edit blog {number}")
```

**Example:** `localhost:8000/blogs/15/edit` → `placeholder to edit blog 15`

---

### 7. `/blogs/<number>/delete` — Delete a blog

Method name: `destroy`

```python
def destroy(request, number):
    return redirect('/blogs')
```

**Behavior:** Redirects to `/blogs` after deletion.

---

### 8. `/blogs/json` — JSON response *(Bonus)*

Method name: `blog_json`

```python
def blog_json(request):
    return JsonResponse({"title": "My First Blog", "content": "This is the blog content."})
```

**Example:** `localhost:8000/blogs/json` → `{"title": "My First Blog", "content": "..."}`

---

## Route Summary

| URL | Method | Behavior |
| --- | ------ | -------- |
| `/` | `root` | Redirects to `/blogs` |
| `/blogs` | `index` | Displays placeholder text |
| `/blogs/new` | `new` | Displays placeholder form text |
| `/blogs/create` | `create` | Redirects to `/` |
| `/blogs/<number>` | `show` | Displays blog by number |
| `/blogs/<number>/edit` | `edit` | Displays edit placeholder for blog |
| `/blogs/<number>/delete` | `destroy` | Redirects to `/blogs` |
| `/blogs/json` | `blog_json` | Returns JSON response |

---

## Key Django Concepts Used

| Concept | Where Used |
| ------- | ---------- |
| `redirect()` | `root`, `create`, `destroy` |
| `HttpResponse()` | `index`, `new`, `show`, `edit` |
| `JsonResponse()` | `blog_json` (Bonus) |
| Route parameters `<int:number>` | `show`, `edit`, `destroy` |
| `include()` in URLs | Wiring `blogs/` app URLs |

---

## Files Included

| File | Description |
| ---- | ----------- |
| `manage.py` | Django project entry point |
| `my_blog_project/settings.py` | Project settings |
| `my_blog_project/urls.py` | Main URL configuration |
| `blogs/views.py` | All view functions |
| `blogs/urls.py` | App-level URL patterns |
