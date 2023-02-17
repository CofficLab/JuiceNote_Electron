package main

import (
	"container/list"
	"fmt"
)

type LRU struct {
	List *list.List
	Map  map[string]*list.Element
}

func NewLRU() LRU {
	lru := LRU{}
	lru.List = list.New()
	lru.Map = make(map[string]*list.Element)

	return lru
}

func (lru *LRU) put(key string, value int) {
	node := lru.List.PushBack(value)
	lru.Map[key] = node
}

func (lru *LRU) toString() string {
	current := lru.List.Front()
	collection := []int{}

	for i := 1; i <= lru.List.Len(); i++ {
		collection = append(collection, current.Value.(int))
		current = current.Next()
	}

	return fmt.Sprintf("%v", collection)
}
