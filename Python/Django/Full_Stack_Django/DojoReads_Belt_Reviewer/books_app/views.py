from django.shortcuts import render, redirect
from django.contrib import messages
from login_app.models import User
from .models import Author, Book, Review


def guard(request):
    if not request.session.get('user_id'):
        return redirect('/')
    return None


def books(request):
    block = guard(request)
    if block:
        return block
    user = User.objects.get(id=request.session['user_id'])
    recent_reviews = Review.objects.select_related('book__author', 'reviewer').order_by('-created_at')[:3]
    other_books = Book.objects.filter(reviews__isnull=False).exclude(
        id__in=[r.book.id for r in recent_reviews]
    ).distinct().select_related('author')
    return render(request, 'books_app/books.html', {
        'user': user,
        'recent_reviews': recent_reviews,
        'other_books': other_books,
    })


def add_book(request):
    block = guard(request)
    if block:
        return block
    if request.method == 'GET':
        authors = Author.objects.all()
        return render(request, 'books_app/add_book.html', {'authors': authors})

    errors = Book.objects.book_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/books/add')

    author_id = request.POST.get('author_id')
    if author_id:
        author = Author.objects.get(id=author_id)
    else:
        author = Author.objects.create(name=request.POST['new_author'].strip())

    book = Book.objects.create(title=request.POST['title'].strip(), author=author)

    errors = Review.objects.review_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect('/books/add')

    user = User.objects.get(id=request.session['user_id'])
    Review.objects.create(
        review=request.POST['review'].strip(),
        rating=int(request.POST['rating']),
        book=book,
        reviewer=user,
    )
    return redirect(f'/books/{book.id}')


def show_book(request, book_id):
    block = guard(request)
    if block:
        return block
    book = Book.objects.select_related('author').get(id=book_id)
    reviews = book.reviews.select_related('reviewer').order_by('-created_at')
    user = User.objects.get(id=request.session['user_id'])
    return render(request, 'books_app/show_book.html', {
        'book': book,
        'reviews': reviews,
        'user': user,
    })


def add_review(request, book_id):
    block = guard(request)
    if block:
        return block
    errors = Review.objects.review_validator(request.POST)
    if errors:
        for msg in errors.values():
            messages.error(request, msg)
        return redirect(f'/books/{book_id}')
    user = User.objects.get(id=request.session['user_id'])
    book = Book.objects.get(id=book_id)
    Review.objects.create(
        review=request.POST['review'].strip(),
        rating=int(request.POST['rating']),
        book=book,
        reviewer=user,
    )
    return redirect(f'/books/{book_id}')


def delete_review(request, review_id):
    block = guard(request)
    if block:
        return block
    review = Review.objects.select_related('book').get(id=review_id)
    book_id = review.book.id
    if review.reviewer_id == request.session['user_id']:
        review.delete()
    return redirect(f'/books/{book_id}')


def user_profile(request, user_id):
    block = guard(request)
    if block:
        return block
    profile = User.objects.get(id=user_id)
    reviews = profile.reviews.select_related('book').order_by('-created_at')
    return render(request, 'books_app/user_profile.html', {
        'profile': profile,
        'reviews': reviews,
    })
