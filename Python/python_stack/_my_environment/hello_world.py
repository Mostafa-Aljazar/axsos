# hello_world.py

# 1
print("Hello World")

# 2a
name = "YourName"
print("Hello", name)

# 2b
print("Hello " + name)

# 3a
num = 42
print("Hello", num)

# 3b
print("Hello " + str(num))

# NINJA BONUS fix for + error (done in 3b using str())

# 4a
fave_food1 = "sushi"
fave_food2 = "pizza"

print("I love to eat {} and {}".format(fave_food1, fave_food2))

# 4b
print(f"I love to eat {fave_food1} and {fave_food2}")

# extra string methods practice
text = "hello world"

print(text.upper())
print(text.lower())
print(text.title())
print(text.count("l"))
print(text.split(" "))
print(text.find("world"))
print(text.endswith("world"))