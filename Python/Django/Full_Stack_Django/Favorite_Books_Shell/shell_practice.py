"""
Run this inside the Django shell:
    python manage.py shell
    exec(open('shell_practice.py').read())
"""

from books_app.models import User, Book

# ── Create users ──────────────────────────────────────────────────────────────
alice = User.objects.create(first_name='Alice', last_name='Smith', email='alice@example.com')
bob   = User.objects.create(first_name='Bob',   last_name='Jones', email='bob@example.com')
carol = User.objects.create(first_name='Carol',  last_name='Lee',   email='carol@example.com')

# ── Create books (one-to-many: uploaded_by) ───────────────────────────────────
book1 = Book.objects.create(title='Clean Code',        desc='Writing readable code.',     uploaded_by=alice)
book2 = Book.objects.create(title='The Pragmatic Programmer', desc='Tips for developers.', uploaded_by=alice)
book3 = Book.objects.create(title='Deep Work',         desc='Focus in a distracted world.', uploaded_by=bob)
book4 = Book.objects.create(title='Atomic Habits',     desc='Building good habits.',      uploaded_by=carol)

# ── Add favorites (many-to-many: users_who_like) ─────────────────────────────
book1.users_who_like.add(alice, bob, carol)
book2.users_who_like.add(bob)
book3.users_who_like.add(alice, carol)
book4.users_who_like.add(alice, bob)

# ── Query examples ────────────────────────────────────────────────────────────

# User who uploaded a book
print("\n--- Who uploaded 'Clean Code'? ---")
print(Book.objects.get(title='Clean Code').uploaded_by)

# All books uploaded by a user
print("\n--- Books uploaded by Alice ---")
for book in alice.books_uploaded.all():
    print(book.title)

# All users who like a book
print("\n--- Users who like 'Clean Code' ---")
for user in book1.users_who_like.all():
    print(user)

# All books a user likes
print("\n--- Books Alice likes ---")
for book in alice.liked_books.all():
    print(book.title)

# Books uploaded by Alice that Bob also likes
print("\n--- Alice's uploads that Bob likes ---")
for book in alice.books_uploaded.filter(users_who_like=bob):
    print(book.title)
