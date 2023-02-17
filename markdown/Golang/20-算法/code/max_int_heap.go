package main

import "fmt"

type MaxIntHeap []int

func NewMaxIntHeap(arr []int) MaxIntHeap {
	return MaxIntHeap(arr)
}

func (a *MaxIntHeap) Push(x any) {
	*a = append(*a, x.(int))
}

func (h *MaxIntHeap) Pop() any {
	fmt.Printf("%v %d\n", *h, (*h)[len(*h)-1])

	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func (a MaxIntHeap) Len() int {
	return len(a)
}

func (a MaxIntHeap) Less(i, j int) bool {
	return a[i] > a[j]
}

func (a MaxIntHeap) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}
