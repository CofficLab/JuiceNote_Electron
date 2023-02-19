package main

import "fmt"

// 用于表示一段区间
type Range struct {
	Left  int
	Right int
}

// len 返回该Range包含的整数的个数
//
//	例如：
//	[10, 1) 包含0个
//	[1,3)   包含2个
func (r *Range) len() int {
	return max(0, r.Right-r.Left)
}

// isEmpty 判断Range是否为空，如果包含的整数个数为0则为空
func (r *Range) isEmpty() bool {
	return r.len() == 0
}

// toString 返回Range的字符串表示形式
//
//	例如：
//	Range{1,100} -> [1,100)
//	Range{1,1}   -> ""
func (r *Range) toString() string {
	if r.isEmpty() {
		return ""
	}

	return fmt.Sprintf("[%d, %d)", r.Left, r.Right)
}

// cut 用于从当前Range中减去当前Range和guest重叠的部分
//
// 例如：
//
//	[1,10) - [5,10)  = [1,5)
//	[1,10) - [10,20) = [1,10)
func (r *Range) cut(guest Range) RangeList {
	host := *r

	// 无共同部分
	// g...g...h...h guest完全在host的左边
	// h...h...g...g guest完全在host的右边
	if !host.hasCommon(guest) {
		return RangeList{host}
	}

	// guest的右侧部分和host有重叠
	// g...h...g...h
	// g...h...h...g
	// guest的左侧部分和host的右侧部分重叠
	// h...g...h...g
	// g...h...h...g
	// guest在host内部
	// h...g...g...h
	// RangeList中可能会包含[10,1)这样无效的区间，不过没关系，在输出时会判断
	return RangeList{{host.Left, guest.Left}, {guest.Right, host.Right}}
}

// merge 用于合并两个Range
//
// 例如：
//
//	""    + [1,100)   = [1,100)
//	[1,9) + [1,100)   = [1,100)
//	[1,9) + [5,20)    = [1,20)
//	[1,9) + [50,200)  = [1,9) [50,200)
func (r *Range) merge(guest Range) RangeList {
	var host = *r

	// guest完全在host的左边：g..g.h....h
	if guest.Right < host.Left {
		return RangeList{guest, host}
	}

	// guest完全在host的右边：h...h...g...g
	if guest.Left > host.Right {
		return RangeList{host, guest}
	}

	// guest和host有重叠部分
	return RangeList{{min(host.Left, guest.Left), max(host.Right, guest.Right)}}
}

// hasCommon 判断两个Range是否有共同区间，有则返回true
func (r *Range) hasCommon(guest Range) bool {
	return !(guest.Right <= r.Left || r.Right <= guest.Left)
}

// max 返回两个int值中的较大者
func max(host int, guest int) int {
	if host >= guest {
		return host
	} else {
		return guest
	}
}

// min 返回两个int值中的较小者
func min(host int, guest int) int {
	if host <= guest {
		return host
	} else {
		return guest
	}
}
