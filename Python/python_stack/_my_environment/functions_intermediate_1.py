import random

def randInt(min=0, max=100):
    # handle edge cases
    if min > max:
        min, max = max, min

    if max < 0 and min < 0:
        pass  # still works normally

    # generate random number in range
    num = random.random() * (max - min) + min

    return round(num)


# test cases
print(randInt())                 # 0 → 100
print(randInt(max=50))           # 0 → 50
print(randInt(min=50))           # 50 → 100
print(randInt(min=50, max=500))  # 50 → 500