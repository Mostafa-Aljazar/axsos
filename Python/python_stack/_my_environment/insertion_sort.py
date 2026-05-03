def insertion_sort(arr):
    for i in range(1, len(arr)):
        current = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = current

    return arr


print(insertion_sort([64, 25, 12, 22, 11]))
print(insertion_sort([5, 3, 8, 4, 2]))