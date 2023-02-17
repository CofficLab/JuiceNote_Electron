package main

import (
	"reflect"
	"testing"
)

func Test_topK(t *testing.T) {
	tests := []struct {
		name string
		arr  []int
		k    int
		want []int
	}{
		{"1", []int{1, 2, 3, 5, 1, 2, 3, 3, 4, 78}, 3, []int{78, 5, 4}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got1, got2, got3, got4 := topK(tt.arr, tt.k)
			if !reflect.DeepEqual(got1, tt.want) {
				t.Errorf("topK() got1 = %v, want %v", got1, tt.want)
			}
			if !reflect.DeepEqual(got2, tt.want) {
				t.Errorf("topK() got2 = %v, want %v", got2, tt.want)
			}
			if !reflect.DeepEqual(got3, tt.want) {
				t.Errorf("topK() got3 = %v, want %v", got3, tt.want)
			}
			if !reflect.DeepEqual(got4, tt.want) {
				t.Errorf("topK() got4 = %v, want %v", got4, tt.want)
			}
		})
	}
}
