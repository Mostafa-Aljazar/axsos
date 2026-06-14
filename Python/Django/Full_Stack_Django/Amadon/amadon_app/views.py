from django.shortcuts import render, redirect
from django.db.models import Sum, F
from .models import Product, Order


def index(request):
    products = Product.objects.all()
    return render(request, 'amadon_app/index.html', {'products': products})


def buy(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        quantity = int(request.POST.get('quantity', 1))
        product = Product.objects.get(id=product_id)
        Order.objects.create(product=product, quantity=quantity)
    return redirect('/amadon/checkout')


def checkout(request):
    last_order = Order.objects.last()
    all_orders = Order.objects.all()

    total_quantity = all_orders.aggregate(total=Sum('quantity'))['total'] or 0
    total_spent = sum(o.total() for o in all_orders)

    return render(request, 'amadon_app/checkout.html', {
        'last_order': last_order,
        'total_quantity': total_quantity,
        'total_spent': total_spent,
    })
