package main

import (
	"container/heap"
)

func topK(arr []int, k int) (answer1, answer2, answer3, answer4 []int) {
	copy1 := make([]int, len(arr))
	copy2 := make([]int, len(arr))
	copy3 := make([]int, len(arr))
	copy4 := make([]int, len(arr))

	copy(copy1, arr)
	copy(copy2, arr)
	copy(copy3, arr)
	copy(copy4, arr)

	answer1 = sortAndGet(copy1, k)
	answer2 = bubblesSort(copy2, k)
	answer3 = partSortAndGet(copy3, k)
	answer4 = heapSort(copy4, k)

	return answer1, answer2, answer3, answer4
}

// 方法1: 全部排序然后获取，最后输出的Top K是有序的
func sortAndGet(collection []int, k int) []int {
	sortedCollection := quickSort(collection)
	return sortedCollection[0:k]
}

// 方法2: 冒泡排序取前k个
func bubblesSort(arr []int, k int) []int {
	result := []int{}
	remains := arr

	for i := 1; i <= k; i++ {
		t, max := bubblesSortGetMaxAndRemains(remains)
		result = append(result, max)
		remains = t
	}

	return result
}

// 方法3：局部排序，可能在全局排序的过程中结果就出来了
func partSortAndGet(arr []int, k int) []int {
	// 边界条件
	if k == 0 {
		return []int{}
	}

	pivot := arr[0]
	left := []int{}
	right := []int{}

	for _, value := range arr[1:] {
		if value >= pivot {
			left = append(left, value)
		} else {
			right = append(right, value)
		}
	}

	if len(left) < k {
		want := partSortAndGet(right, k-len(left)-1)

		return append(append(left, pivot), want...)
	} else if len(left) == k {
		return left
	} else {
		return partSortAndGet(left, k)
	}
}

// 方法4：建立一个大顶堆
func heapSort(arr []int, k int) []int {
	result := []int{}
	myHeap := NewMaxIntHeap(arr)
	heap.Init(&myHeap)

	for i := 1; i <= k; i++ {
		result = append(result, heap.Pop(&myHeap).(int))
	}

	return result
}

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

func bubblesSortGetMaxAndRemains(arr []int) ([]int, int) {
	if len(arr) == 1 {
		return []int{}, arr[0]
	}

	max := arr[0]
	position := 0
	remains := []int{}

	for key, value := range arr {
		if value > max {
			max = value
			position = key
		}
	}

	if position == 0 {
		remains = arr[1:]
	} else if position == len(arr)-1 {
		remains = arr[0:position]
	} else {
		remains = append(arr[0:position], arr[position+1:]...)
	}

	return remains, max
}
