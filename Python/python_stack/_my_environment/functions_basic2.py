# 1. Countdown
def countdown(num):
    result = []
    for i in range(num, -1, -1):
        result.append(i)
    return result

# Example
print(countdown(5))  


# 2. Print and Return
def print_and_return(lst):
    print(lst[0])
    return lst[1]

# Example
print(print_and_return([1, 2]))


# 3. First Plus Length
def first_plus_length(lst):
    return lst[0] + len(lst)

# Example
print(first_plus_length([1, 2, 3, 4, 5]))


# 4. Values Greater than Second
def values_greater_than_second(lst):
    if len(lst) < 2:
        return False

    new_list = []
    second_value = lst[1]

    for val in lst:
        if val > second_value:
            new_list.append(val)

    print(len(new_list))
    return new_list

# Example
print(values_greater_than_second([5, 2, 3, 2, 1, 4]))
print(values_greater_than_second([3]))


# 5. This Length, That Value
def length_and_value(size, value):
    result = []
    for i in range(size):
        result.append(value)
    return result

# Example
print(length_and_value(4, 7))
print(length_and_value(6, 2))