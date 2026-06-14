from django.shortcuts import render, redirect
from django.contrib import messages
from login_app.models import User
from .models import Book


def guard(request):
    if not request.session.get('user_id'):
        return redirect('/')
    return None


def books(request):
    if guard(request):
        return redirect('/')
    user = User.objects.get(id=request.session['user_id'])
    all_books = Book.objects.select_related('uploaded_by').prefetch_related('users_who_like').all()
    return render(request, 'books_app/books.html', {'user': user, 'all_books': all_books})


def add_book(request):
    if guard(request):
        return redirect('/')
    if request.method != 'POST':
        return redirect('/books')

    errors = Book.objects.basic_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/books')

    user = User.objects.get(id=request.session['user_id'])
    book = Book.objects.create(
        title=request.POST['title'].strip(),
        desc=request.POST['desc'].strip(),
        uploaded_by=user,
    )
    book.users_who_like.add(user)
    return redirect('/books')


def show_book(request, book_id):
    if guard(request):
        return redirect('/')
    user = User.objects.get(id=request.session['user_id'])
    book = Book.objects.select_related('uploaded_by').prefetch_related('users_who_like').get(id=book_id)
    return render(request, 'books_app/show.html', {'user': user, 'book': book})


def favorite(request, book_id):
    if guard(request):
        return redirect('/')
    user = User.objects.get(id=request.session['user_id'])
    book = Book.objects.get(id=book_id)
    book.users_who_like.add(user)
    return redirect(f'/books/{book_id}')


def unfavorite(request, book_id):
    if guard(request):
        return redirect('/')
    user = User.objects.get(id=request.session['user_id'])
    book = Book.objects.get(id=book_id)
    book.users_who_like.remove(user)
    return redirect(f'/books/{book_id}')


def edit_book(request, book_id):
    if guard(request):
        return redirect('/')
    book = Book.objects.get(id=book_id)
    if book.uploaded_by.id != request.session['user_id']:
        return redirect('/books')
    return render(request, 'books_app/edit.html', {'book': book})


def update_book(request, book_id):
    if guard(request):
        return redirect('/')
    if request.method != 'POST':
        return redirect('/books')

    book = Book.objects.get(id=book_id)
    if book.uploaded_by.id != request.session['user_id']:
        return redirect('/books')

    errors = Book.objects.basic_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect(f'/books/{book_id}/edit')

    book.title = request.POST['title'].strip()
    book.desc  = request.POST['desc'].strip()
    book.save()
    return redirect(f'/books/{book_id}')


def delete_book(request, book_id):
    if guard(request):
        return redirect('/')
    book = Book.objects.get(id=book_id)
    if book.uploaded_by.id == request.session['user_id']:
        book.delete()
    return redirect('/books')


def my_favorites(request):
    if guard(request):
        return redirect('/')
    user = User.objects.prefetch_related('liked_books').get(id=request.session['user_id'])
    return render(request, 'books_app/my_favorites.html', {'user': user})
