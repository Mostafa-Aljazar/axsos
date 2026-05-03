# For Loop Basic II

# 1. Biggie Size
def biggie_size(lst):
    for i in range(len(lst)):
        if lst[i] > 0:
            lst[i] = "big"
    return lst

print(biggie_size([-1, 3, 5, -5]))


# 2. Count Positives
def count_positives(lst):
    count = 0

    for i in range(len(lst)):
        if lst[i] > 0:
            count += 1

    lst[-1] = count
    return lst

print(count_positives([-1, 1, 1, 1]))
print(count_positives([1, 6, -4, -2, -7, -2]))


# 3. Sum Total
def sum_total(lst):
    total = 0

    for num in lst:
        total += num

    return total

print(sum_total([1, 2, 3, 4]))
print(sum_total([6, 3, -2]))


# 4. Average
def average(lst):
    total = 0

    for num in lst:
        total += num

    return total / len(lst)

print(average([1, 2, 3, 4]))


# 5. Length
def length(lst):
    count = 0

    for item in lst:
        count += 1

    return count

print(length([37, 2, 1, -9]))
print(length([]))


# 6. Minimum
def minimum(lst):
    if len(lst) == 0:
        return False

    min_val = lst[0]

    for num in lst:
        if num < min_val:
            min_val = num

    return min_val

print(minimum([37, 2, 1, -9]))
print(minimum([]))


# 7. Maximum
def maximum(lst):
    if len(lst) == 0:
        return False

    max_val = lst[0]

    for num in lst:
        if num > max_val:
            max_val = num

    return max_val

print(maximum([37, 2, 1, -9]))
print(maximum([]))


# 8. Ultimate Analysis
def ultimate_analysis(lst):
    if len(lst) == 0:
        return False

    sum_total = sum_total(lst)
    avg = sum_total / len(lst)
    min_val = minimum(lst)
    max_val = maximum(lst)

    result = {
        "sumTotal": sum_total,
        "average": avg,
        "minimum": min_val,
        "maximum": max_val,
        "length": len(lst)
    }

    return result

print(ultimate_analysis([37, 2, 1, -9]))


# 9. Reverse List (in place)
def reverse_list(lst):
    left = 0
    right = len(lst) - 1

    while left < right:
        temp = lst[left]
        lst[left] = lst[right]
        lst[right] = temp

        left += 1
        right -= 1

    return lst

print(reverse_list([37, 2, 1, -9]))