from store import Store
from product import Product

# create store
store = Store("Tech Store")

# create products
p1 = Product("Laptop", 1000, "Electronics")
p2 = Product("Phone", 500, "Electronics")
p3 = Product("Shirt", 50, "Clothes")

# add products
store.add_product(p1)
store.add_product(p2)
store.add_product(p3)

# test product method
p1.print_info()

# sell product (by index)
store.sell_product(1)

# inflation (increase all prices 10%)
store.inflation(10)

# clearance (20% discount on clothes)
store.set_clearance("Clothes", 20)

# final check
for product in store.products:
    product.print_info()