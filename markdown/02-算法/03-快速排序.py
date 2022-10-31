def quicksort(array):
    if len(array) < 2:
        return array
    pivot = array[0]
    smaller = []
    bigger = []
    for item in array[1:]:
        if item <= pivot:
            smaller.append(item)
        else:
            bigger.append(item)

    return quicksort(smaller) + [pivot] + (quicksort(bigger))


print(quicksort([10, 5, 2, 3, 9]))

# 数组大小不知道
arr = []

for i in range(0, 11):
    brr = []
    for j in range(0, 6):
        brr.append(i*j)
    arr.append(brr)

print(arr[3][3])
