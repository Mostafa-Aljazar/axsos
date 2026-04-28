# modular_example/arithmetic.py

def add(x, y):
    return x + y

def multiply(x, y):
    return x * y

def subtract(x, y):
    return x - y


if __name__ == "__main__":
    print("Testing arithmetic functions:")
    print(add(5, 3))
    print(subtract(10, 5))
    print(multiply(12, 6))