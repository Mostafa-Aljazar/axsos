def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i

        for j in range(i, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j

        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr


# test
print(selection_sort([64, 25, 12, 22, 11]))
print(selection_sort([5, 3, 8, 4, 2]))