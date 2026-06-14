from django.shortcuts import render, redirect
from .models import Book, Author


def books(request):
    all_books = Book.objects.all()
    return render(request, 'books_authors_app/books.html', {'books': all_books})


def create_book(request):
    if request.method == 'POST':
        Book.objects.create(
            title=request.POST['title'],
            desc=request.POST['desc'],
        )
    return redirect('/books')


def book_detail(request, book_id):
    book = Book.objects.get(id=book_id)
    authors_not_on_book = Author.objects.exclude(books=book)
    return render(request, 'books_authors_app/book_detail.html', {
        'book': book,
        'authors_not_on_book': authors_not_on_book,
    })


def add_author_to_book(request, book_id):
    if request.method == 'POST':
        book = Book.objects.get(id=book_id)
        author = Author.objects.get(id=request.POST['author_id'])
        book.authors.add(author)
    return redirect(f'/books/{book_id}')


def authors(request):
    all_authors = Author.objects.all()
    return render(request, 'books_authors_app/authors.html', {'authors': all_authors})


def create_author(request):
    if request.method == 'POST':
        Author.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            notes=request.POST['notes'],
        )
    return redirect('/authors')


def author_detail(request, author_id):
    author = Author.objects.get(id=author_id)
    books_not_by_author = Book.objects.exclude(authors=author)
    return render(request, 'books_authors_app/author_detail.html', {
        'author': author,
        'books_not_by_author': books_not_by_author,
    })


def add_book_to_author(request, author_id):
    if request.method == 'POST':
        author = Author.objects.get(id=author_id)
        book = Book.objects.get(id=request.POST['book_id'])
        author.books.add(book)
    return redirect(f'/authors/{author_id}')
