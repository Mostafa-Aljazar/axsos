# for_loop_basic1.py

# 1. Basic - Print all integers from 0 to 150
for i in range(0, 151):
    print(i)

# 2. Multiples of Five - Print all multiples of 5 from 5 to 1000
for i in range(5, 1001, 5):
    print(i)

# 3. Counting, the Dojo Way
for i in range(1, 101):
    if i % 10 == 0:
        print("Coding Dojo")
    elif i % 5 == 0:
        print("Coding")
    else:
        print(i)

# 4. Whoa. That Sucker's Huge - sum of odd numbers from 0 to 500000
total = 0
for i in range(1, 500001, 2):
    total += i

print(total)

# 5. Countdown by Fours - from 2018 down to 0
for i in range(2018, -1, -4):
    print(i)

# 6. Flexible Counter
lowNum = 2
highNum = 9
mult = 3

for i in range(lowNum, highNum + 1):
    if i % mult == 0:
        print(i)