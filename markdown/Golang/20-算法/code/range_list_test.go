package main

import (
	"reflect"
	"testing"
)

// TestRangeList_Add RangeList结构体add方法的单元测试
func TestRangeList_add(t *testing.T) {
	tests := []struct {
		name  string
		r     RangeList
		guest Range
		want  string
	}{
		{
			name:  "1.RangeList为空",
			r:     RangeList{},
			guest: Range{1, 5},
			want:  "[1, 5)",
		},
		{
			name:  "2.Guest在RangeList左侧：g..g..r..r",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 5},
			want:  "[1, 5) [10, 20) [21, 30) [31, 40)",
		},
		{
			name:  "3.Guest在RangeList左侧，边界重叠：g..gr..r",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 10},
			want:  "[1, 20) [21, 30) [31, 40)",
		},
		{
			name:  "4.Guest与RangeList左1有重叠：g.r1.g..r1..r2..r2",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 15},
			want:  "[1, 20) [21, 30) [31, 40)",
		},
		{
			name:  "5.Guest在RangeList左1左2之间：r1...r1.g..g.r2...r2",
			r:     RangeList{{10, 20}, {31, 40}},
			guest: Range{22, 25},
			want:  "[10, 20) [22, 25) [31, 40)",
		},
		{
			name:  "6.Guest在RangeList右侧：r...r.g..g",
			r:     RangeList{{10, 20}, {31, 40}},
			guest: Range{50, 60},
			want:  "[10, 20) [31, 40) [50, 60)",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			original := tt.r
			tt.r.add(tt.guest)
			if got := tt.r; !reflect.DeepEqual(got.toString(), tt.want) {
				t.Errorf("%s ADD %s = %s, want %s", original.toString(), tt.guest.toString(), got.toString(), tt.want)
			}
		})
	}
}

// TestRangeList_remove RangeList结构体remove方法的单元测试
func TestRangeList_remove(t *testing.T) {
	tests := []struct {
		name  string
		r     RangeList
		guest Range
		want  string
	}{
		{
			name:  "1.RangeList为空",
			r:     RangeList{},
			guest: Range{1, 5},
			want:  "",
		},
		{
			name:  "2.Guest在RangeList左侧：g..g..r..r",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 5},
			want:  "[10, 20) [21, 30) [31, 40)",
		},
		{
			name:  "3.Guest在RangeList左侧，边界重叠：g..gr..r",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 10},
			want:  "[10, 20) [21, 30) [31, 40)",
		},
		{
			name:  "4.Guest与RangeList左1有重叠：g.r1.g..r1..r2..r2",
			r:     RangeList{{10, 20}, {21, 30}, {31, 40}},
			guest: Range{1, 15},
			want:  "[15, 20) [21, 30) [31, 40)",
		},
		{
			name:  "5.Guest在RangeList左1左2之间：r1...r1.g..g.r2...r2",
			r:     RangeList{{10, 20}, {31, 40}},
			guest: Range{22, 25},
			want:  "[10, 20) [31, 40)",
		},
		{
			name:  "6.Guest在RangeList右侧：r...r.g..g",
			r:     RangeList{{10, 20}, {31, 40}},
			guest: Range{50, 60},
			want:  "[10, 20) [31, 40)",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			original := tt.r
			tt.r.remove(tt.guest)
			if !reflect.DeepEqual(tt.r.toString(), tt.want) {
				t.Errorf("%s REMOVE %s = %s, want %s", original.toString(), tt.guest.toString(), tt.r.toString(), tt.want)
			}
		})
	}
}

// TestRangeList_toString RangeList结构体toString方法的单元测试
func TestRangeList_toString(t *testing.T) {
	tests := []struct {
		name      string
		rangeList RangeList
		want      string
	}{
		{"空值", RangeList{{1, 1}}, ""},
		{"一个", RangeList{{1, 10}}, "[1, 10)"},
		{"两个", RangeList{{1, 10}, {15, 30}}, "[1, 10) [15, 30)"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.rangeList.toString(); got != tt.want {
				t.Errorf("%v TO_STRING = %s, want %s", tt.rangeList, got, tt.want)
			}
		})
	}
}
