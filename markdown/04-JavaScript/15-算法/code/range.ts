import RangeList from "./range_list";

// 用于表示一段区间
class RangePart {
	left: number;
	right: number;

	constructor(left: number, right: number) {
		this.left = left;
		this.right = right;
	}

	// 返回该Range包含的整数的个数
	//
	//	例如：
	//	[10, 1) 包含0个
	//	[1,3)   包含2个
	len() {
		return Math.max(0, this.right - this.left);
	}

	// 判断Range是否为空，如果包含的整数个数为0则为空
	isEmpty() {
		return this.len() == 0;
	}

	// 返回Range的字符串表示形式
	//
	//	例如：
	//	Range{1,100} -> [1,100)
	//	Range{1,1}   -> ""
	toString() {
		if (this.isEmpty()) {
			return "";
		}

		return "[" + this.left + ", " + this.right + ")";
	}

	// 用于从当前Range中减去当前Range和guest重叠的部分
	//
	// 例如：
	//
	//	[1,10) - [5,10)  = [1,5)
	//	[1,10) - [10,20) = [1,10)
	cut(guest) {
		// 无共同部分
		// g...g...h...h guest完全在host的左边
		// h...h...g...g guest完全在host的右边
		if (!this.hasCommon(guest)) {
			return new RangeList([this]);
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
		return new RangeList([
			new RangePart(this.left, guest.left),
			new RangePart(guest.right, this.right)]
		);
	}

	// 用于合并两个Range
	//
	// 例如：
	//
	//	""    + [1,100)   = [1,100)
	//	[1,9) + [1,100)   = [1,100)
	//	[1,9) + [5,20)    = [1,20)
	//	[1,9) + [50,200)  = [1,9) [50,200)
	merge(guest) {
		var host = this;

		// guest完全在host的左边：g..g.h....h
		if (guest.right < host.left) {
			return new RangeList([guest, host]);
		}

		// guest完全在host的右边：h...h...g...g
		if (guest.left > host.right) {
			return new RangeList([host, guest]);
		}

		// guest和host有重叠部分
		return new RangeList([new RangePart(
			Math.min(host.left, guest.left),
			Math.max(host.right, guest.right)
		)]);
	}

	// 判断两个Range是否有共同区间，有则返回true
	hasCommon(guest) {
		return !(guest.right <= this.left || this.right <= guest.left);
	}
}

export default RangePart
