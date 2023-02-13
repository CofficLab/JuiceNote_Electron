package main

import (
	"container/list"
	"fmt"
)

type LRU struct {
	List *list.List
	Map  map[string]int
}

func NewLRU() LRU {
	lru := LRU{}
	lru.List = list.New()

	return lru
}

func (lru *LRU) put(key string, value int) {
	lru.List.PushBack(value)
	fmt.Println(lru.List)
}

func (lru *LRU) toString() string {
	current := lru.List.Front()
	collection := []int{}

	for i := 1; i < lru.List.Len(); i++ {
		collection = append(collection, current.Value.(int))
		current = current.Next()
	}

	return fmt.Sprintf("%v", collection)
}
