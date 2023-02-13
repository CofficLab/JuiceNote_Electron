package main

import (
	"reflect"
	"testing"
)

// TestRange_len Range结构体len方法的单元测试
func TestRange_len(t *testing.T) {
	type fields struct {
		Left  int
		Right int
	}
	tests := []struct {
		name   string
		fields fields
		want   int
	}{
		{"空值", fields{1, 1}, 0},
		{"非空", fields{1, 100}, 99},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Range{
				Left:  tt.fields.Left,
				Right: tt.fields.Right,
			}
			if got := r.len(); got != tt.want {
				t.Errorf("LEN of %v = %d, want %d", tt.fields, got, tt.want)
			}
		})
	}
}

// TestRange_isEmpty Range结构体isEmpty方法的单元测试
func TestRange_isEmpty(t *testing.T) {
	type fields struct {
		Left  int
		Right int
	}
	tests := []struct {
		name   string
		fields fields
		want   bool
	}{
		{"空值", fields{1, 1}, true},
		{"非空", fields{1, 100}, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Range{
				Left:  tt.fields.Left,
				Right: tt.fields.Right,
			}
			if got := r.isEmpty(); got != tt.want {
				t.Errorf("%v IS_EMPTY = %t, want %t", tt.fields, got, tt.want)
			}
		})
	}
}

// TestRange_toString Range结构体的toString方法的单元测试
func TestRange_toString(t *testing.T) {
	type fields struct {
		Left  int
		Right int
	}
	tests := []struct {
		name   string
		fields fields
		want   string
	}{
		{"空值", fields{1, 1}, ""},
		{"负数", fields{100, 1}, ""},
		{"非空", fields{1, 100}, "[1, 100)"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Range{
				Left:  tt.fields.Left,
				Right: tt.fields.Right,
			}
			if got := r.toString(); got != tt.want {
				t.Errorf("%v TO_STRING = %s, want %s", tt.fields, got, tt.want)
			}
		})
	}
}

// TestRange_cut Range结构体的cut方法的单元测试
func TestRange_cut(t *testing.T) {
	tests := []struct {
		name  string
		host  Range
		guest Range
		want  string
	}{
		// 第一部分：host 比 guest 宽，让 guest 不断右移来生成测试用例
		{
			name:  "01.相对位置：g..g.h....h",
			host:  Range{15, 20},
			guest: Range{10, 13},
			want:  "[15, 20)",
		},
		{
			name:  "02.相对位置：g..gh....h",
			host:  Range{15, 20},
			guest: Range{12, 15},
			want:  "[15, 20)",
		},
		{
			name:  "03.相对位置：g.h.g...h",
			host:  Range{15, 20},
			guest: Range{13, 16},
			want:  "[16, 20)",
		},
		{
			name:  "04.相对位置：hg..g..h",
			host:  Range{15, 20},
			guest: Range{15, 18},
			want:  "[18, 20)",
		},
		{
			name:  "05.相对位置：h.g..g.h",
			host:  Range{15, 20},
			guest: Range{16, 19},
			want:  "[15, 16) [19, 20)",
		},
		{
			name:  "06.相对位置：h..g..gh",
			host:  Range{15, 20},
			guest: Range{17, 20},
			want:  "[15, 17)",
		},
		{
			name:  "07.相对位置：h...g.h.g",
			host:  Range{15, 20},
			guest: Range{19, 22},
			want:  "[15, 19)",
		},
		{
			name:  "08.相对位置：h....hg..g",
			host:  Range{15, 20},
			guest: Range{20, 23},
			want:  "[15, 20)",
		},
		{
			name:  "09.相对位置：h....h.g..g",
			host:  Range{15, 20},
			guest: Range{21, 24},
			want:  "[15, 20)",
		},

		// 第二部分：host 比 guest 窄，让 guest 不断右移来生成测试用例
		{
			name:  "10.相对位置：g....g..h..h",
			host:  Range{15, 18},
			guest: Range{7, 12},
			want:  "[15, 18)",
		},
		{
			name:  "11.相对位置：g....gh..h",
			host:  Range{15, 18},
			guest: Range{10, 15},
			want:  "[15, 18)",
		},
		{
			name:  "12.相对位置：g...h.g.h",
			host:  Range{15, 18},
			guest: Range{11, 16},
			want:  "[16, 18)",
		},
		{
			name:  "13.相对位置：g..h..gh",
			host:  Range{15, 18},
			guest: Range{13, 18},
			want:  "",
		},
		{
			name:  "14.相对位置：g.h..h.g",
			host:  Range{15, 18},
			guest: Range{14, 19},
			want:  "",
		},
		{
			name:  "15.相对位置：gh..h..g",
			host:  Range{15, 18},
			guest: Range{15, 20},
			want:  "",
		},
		{
			name:  "16.相对位置：h.g.h..g",
			host:  Range{15, 18},
			guest: Range{16, 21},
			want:  "[15, 16)",
		},
		{
			name:  "17.相对位置：h..gh....g",
			host:  Range{15, 18},
			guest: Range{18, 23},
			want:  "[15, 18)",
		},
		{
			name:  "18.相对位置：h..h...g....g",
			host:  Range{15, 18},
			guest: Range{22, 27},
			want:  "[15, 18)",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.host.cut(tt.guest); !reflect.DeepEqual(got.toString(), tt.want) {
				t.Errorf("%s CUT %s = %s, want %s", tt.host.toString(), tt.guest.toString(), got.toString(), tt.want)
			}
		})
	}
}

// TestRange_merge Range结构体merge方法的单元测试
func TestRange_merge(t *testing.T) {
	tests := []struct {
		name  string
		host  Range
		guest Range
		want  string
	}{
		// 第一部分：host 比 guest 宽，让 guest 不断右移
		{
			name:  "01.相对位置：g..g.h....h",
			host:  Range{15, 20},
			guest: Range{10, 13},
			want:  "[10, 13) [15, 20)",
		},
		{
			name:  "02.相对位置：g..gh....h",
			host:  Range{15, 20},
			guest: Range{12, 15},
			want:  "[12, 20)",
		},
		{
			name:  "03.相对位置：g.h.g...h",
			host:  Range{15, 20},
			guest: Range{13, 16},
			want:  "[13, 20)",
		},
		{
			name:  "04.相对位置：hg..g..h",
			host:  Range{15, 20},
			guest: Range{15, 18},
			want:  "[15, 20)",
		},
		{
			name:  "05.相对位置：h.g..g.h",
			host:  Range{15, 20},
			guest: Range{16, 19},
			want:  "[15, 20)",
		},
		{
			name:  "06.相对位置：h..g..gh",
			host:  Range{15, 20},
			guest: Range{17, 20},
			want:  "[15, 20)",
		},
		{
			name:  "07.相对位置：h...g.h.g",
			host:  Range{15, 20},
			guest: Range{19, 22},
			want:  "[15, 22)",
		},
		{
			name:  "08.相对位置：h....hg..g",
			host:  Range{15, 20},
			guest: Range{20, 23},
			want:  "[15, 23)",
		},
		{
			name:  "09.相对位置：h....h.g..g",
			host:  Range{15, 20},
			guest: Range{21, 24},
			want:  "[15, 20) [21, 24)",
		},

		// 第二部分：host 比 guest 窄，让 guest 不断右移
		{
			name:  "10.相对位置：g....g..h..h",
			host:  Range{15, 18},
			guest: Range{7, 12},
			want:  "[7, 12) [15, 18)",
		},
		{
			name:  "11.相对位置：g....gh..h",
			host:  Range{15, 18},
			guest: Range{10, 15},
			want:  "[10, 18)",
		},
		{
			name:  "12.相对位置：g...h.g.h",
			host:  Range{15, 18},
			guest: Range{11, 16},
			want:  "[11, 18)",
		},
		{
			name:  "13.相对位置：g..h..gh",
			host:  Range{15, 18},
			guest: Range{13, 18},
			want:  "[13, 18)",
		},
		{
			name:  "14.相对位置：g.h..h.g",
			host:  Range{15, 18},
			guest: Range{14, 19},
			want:  "[14, 19)",
		},
		{
			name:  "15.相对位置：gh..h..g",
			host:  Range{15, 18},
			guest: Range{15, 20},
			want:  "[15, 20)",
		},
		{
			name:  "16.相对位置：h.g.h..g",
			host:  Range{15, 18},
			guest: Range{16, 21},
			want:  "[15, 21)",
		},
		{
			name:  "17.相对位置：h..gh....g",
			host:  Range{15, 18},
			guest: Range{18, 23},
			want:  "[15, 23)",
		},
		{
			name:  "18.相对位置：h..h...g....g",
			host:  Range{15, 18},
			guest: Range{22, 27},
			want:  "[15, 18) [22, 27)",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.host.merge(tt.guest); !reflect.DeepEqual(got.toString(), tt.want) {
				t.Errorf("%s MERGE %s = %s want %s", tt.host.toString(), tt.guest.toString(), got.toString(), tt.want)
			}
		})
	}
}

// TestRange_hasCommon Range结构体hasCommon方法的单元测试
func TestRange_hasCommon(t *testing.T) {
	tests := []struct {
		name  string
		host  Range
		guest Range
		want  bool
	}{
		{
			name:  "有共同区间",
			host:  Range{1, 10},
			guest: Range{2, 20},
			want:  true,
		},
		{
			name:  "无共同区间",
			host:  Range{1, 10},
			guest: Range{20, 30},
			want:  false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.host.hasCommon(tt.guest); got != tt.want {
				t.Errorf("%s HAS_COMMON %s = %t, want %t", tt.host.toString(), tt.guest.toString(), got, tt.want)
			}
		})
	}
}
