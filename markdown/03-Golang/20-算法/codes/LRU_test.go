package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLRU_put(t *testing.T) {
	lru := NewLRU()
	lru.put("test", 1)

	assert.Equal(t, "", lru.toString())
}
