package main

func quickSort(collection []int) []int {
	// 边界条件
	if len(collection) <= 1 {
		return collection
	}

	pivot := collection[0]
	left := []int{}
	right := []int{}

	for _, value := range collection[1:] {
		if value >= pivot {
			left = append(left, value)
		} else {
			right = append(right, value)
		}
	}

	// left + pivot + right 三个拼接起来，结果是降序排列
	return append(append(quickSort(left), pivot), quickSort(right)...)
}
