import RangePart from "./range"

class RangeList {
	items: RangePart[];

	constructor(rangeList: RangePart[]) {
		this.items = rangeList;
	}

	//   add 向RangeList添加一个Range

	//   例如：

	//   	""             + [1,100)   = [1,100)
	//   	[1,100)        + [150,200) = [1,100) [150,200)
	//   	[1,100)        + [50,200)  = [1,200)
	//   	[50,100)       + [1,10)    = [1,10) [50,100)
	//   	[1,10) [20,30) + [11,15)   = [1,10) [11,15) [20,30)
	add(guest: RangePart) {
		// guest为空、RangeList为空、guest在RangeList的左侧、guest在RangeList的右侧、guest与RangeList有重叠

		let result = [guest];
		if (this.items.length == 0) {
			this.items = result
			return
		}

		for (let i = 0; i < this.items.length; i++) {
			let last = result.at(-1)
			let item = this.items[i]
			if (last == undefined) {
				console.error('last of result is undefined')
				return false
			}

			if (item.left > last.right) {
				result = result.concat(this.items.slice(i));
				break;
			}

			let merged = last.merge(item)
			result.pop()
			result = result.concat(merged.items)
		}

		this.items = result;
	}

	// 从该RangeList中删除一段Range
	//
	// 例如：
	//
	//	""             - [1,100)   = ""
	//	[1,100)        - [150,200) = [1,100)
	//	[1,100)        - [50,200)  = [1,50)
	//	[50,100)       - [1,10)    = [50,100)
	//	[1,10) [20,30) - [11,15)   = [1,10) [20,30)
	remove(guest: RangePart) {
		// RangeList元素个数为0 或 guest在RangeList的左侧或右侧，无需操作
		if (this.items.length == 0 || this.items.at(0).left >= guest.right || this.items.at(-1).right <= guest.right) {
			return
		}

		// guest 在 RangeList 的内部
		let result = []
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items.at(i)
			// 利用rangeList有序的特性，减少一部分cut操作
			if (item.left > guest.right) {
				result = result.concat(this.items.slice(i))
				break
			}

			result = result.concat(item.cut(guest).items)
		}

		this.items = result
	}

	// 用于将RangeList转换成字符串格式
	toString() {
		let ranges = new Array;

		for (const item of this.items) {
			// 空Range可以存在，但不输出
			if (!item.isEmpty()) {
				ranges.push(item.toString());
			}
		}

		return ranges.join(" ");
	}
}

export default RangeList
