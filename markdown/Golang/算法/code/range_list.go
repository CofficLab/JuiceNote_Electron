package main

import "strings"

// 包含0个或多个区间的数组
type RangeList []Range

// add 向RangeList添加一个Range
//
// 例如：
//
//	""             + [1,100)   = [1,100)
//	[1,100)        + [150,200) = [1,100) [150,200)
//	[1,100)        + [50,200)  = [1,200)
//	[50,100)       + [1,10)    = [1,10) [50,100)
//	[1,10) [20,30) + [11,15)   = [1,10) [11,15) [20,30)
func (r *RangeList) add(guest Range) {
	// guest为空、RangeList为空、guest在RangeList的左侧、guest在RangeList的右侧、guest与RangeList有重叠
	result := RangeList{guest}
	for i, item := range *r {
		last := result.last()

		// 利用rangeList有序的特性，减少一部分merge操作
		if item.Left > last.Right {
			result.concat(r.since(i))
			break
		}

		merged := last.merge(item)
		result.popLast()
		result.concat(merged)
	}

	*r = result
}

// remove 从该RangeList中删除一段Range
//
// 例如：
//
//	""             - [1,100)   = ""
//	[1,100)        - [150,200) = [1,100)
//	[1,100)        - [50,200)  = [1,50)
//	[50,100)       - [1,10)    = [50,100)
//	[1,10) [20,30) - [11,15)   = [1,10) [20,30)
func (r *RangeList) remove(guest Range) {
	// RangeList元素个数为0 或 guest在RangeList的左侧或右侧，无需操作
	if len(*r) == 0 || r.first().Left >= guest.Right || r.last().Right <= guest.Right {
		return
	}

	// guest 在 RangeList 的内部
	result := RangeList{}
	for i, item := range *r {
		// 利用rangeList有序的特性，减少一部分cut操作
		if item.Left > guest.Right {
			result.concat(r.since(i))
			break
		}

		result.concat(item.cut(guest))
	}

	*r = result
}

// toString 用于将RangeList转换成字符串格式
func (r *RangeList) toString() string {
	ranges := []string{}

	for _, item := range *r {
		// 空Range可以存在，但不输出
		if !item.isEmpty() {
			ranges = append(ranges, item.toString())
		}
	}

	return strings.Join(ranges, " ")
}

// append 用于在RangeList末尾增加一个Range
func (r *RangeList) append(guest Range) RangeList {
	return append(*r, guest)
}

// prepend 用于在RangeList开头增加一个Range
func (r *RangeList) prepend(guest Range) RangeList {
	return append(RangeList{guest}, *r...)
}

// last 用于返回RangeList的第一个Range
func (r *RangeList) first() Range {
	rangeList := *r

	if len(rangeList) == 0 {
		return Range{}
	}

	return rangeList[0]
}

// last 用于返回RangeList的最后一个Range
func (r *RangeList) last() Range {
	rangeList := *r

	if len(rangeList) == 0 {
		return Range{}
	}

	return rangeList[len(rangeList)-1]
}

// since 返回index和index后的部分
func (r *RangeList) since(index int) RangeList {
	return (*r)[index:]
}

// before 返回index前的部分，不包括index
func (r *RangeList) before(index int) RangeList {
	return (*r)[:index]
}

// popLast 去除最后一个Range
func (r *RangeList) popLast() {
	if len(*r) == 0 {
		return
	}

	*r = (*r)[0 : len(*r)-1]
}

// concat 用于拼接两个RangeList
func (r *RangeList) concat(guest RangeList) {
	if len(*r) == 0 {
		*r = guest
		return
	}

	if len(guest) == 0 {
		return
	}

	*r = append(*r, guest...)
}
