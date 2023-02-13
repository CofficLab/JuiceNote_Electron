import { describe, expect, test } from "@jest/globals";
import RangeList from "./range_list";
import RangePart from "./range";

let casesForAdd = [
	{
		name: "test RangeList.add-1.RangeList为空",
		r: new RangeList([]),
		guest: new RangePart(1, 5),
		want: "[1, 5)",
	},
	{
		name: "test RangeList.add-2.Guest在RangeList左侧：g..g..r..r",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 5),
		want: "[1, 5) [10, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.add-3.Guest在RangeList左侧，边界重叠：g..gr..r",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 10),
		want: "[1, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.add-4.Guest与RangeList左1有重叠：g.r1.g..r1..r2..r2",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 15),
		want: "[1, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.add-5.Guest在RangeList左1左2之间：r1...r1.g..g.r2...r2",
		r: new RangeList([new RangePart(10, 20), new RangePart(31, 40)]),
		guest: new RangePart(22, 25),
		want: "[10, 20) [22, 25) [31, 40)",
	},
	{
		name: "test RangeList.add-6.Guest在RangeList右侧：r...r.g..g",
		r: new RangeList([new RangePart(10, 20), new RangePart(31, 40)]),
		guest: new RangePart(50, 60),
		want: "[10, 20) [31, 40) [50, 60)",
	}
]
casesForAdd.forEach(element => {
	test(element.name, () => {
		element.r.add(element.guest)
		expect(element.r.toString()).toBe(element.want)
	})
})

let casesForRemove = [
	{
		name: "test RangeList.remove-1.RangeList为空",
		r: new RangeList([]),
		guest: new RangePart(1, 5),
		want: "",
	},
	{
		name: "test RangeList.remove-2.Guest在RangeList左侧：g..g..r..r",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 5),
		want: "[10, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.remove-3.Guest在RangeList左侧，边界重叠：g..gr..r",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 10),
		want: "[10, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.remove-4.Guest与RangeList左1有重叠：g.r1.g..r1..r2..r2",
		r: new RangeList([new RangePart(10, 20), new RangePart(21, 30), new RangePart(31, 40)]),
		guest: new RangePart(1, 15),
		want: "[15, 20) [21, 30) [31, 40)",
	},
	{
		name: "test RangeList.remove-5.Guest在RangeList左1左2之间：r1...r1.g..g.r2...r2",
		r: new RangeList([new RangePart(10, 20), new RangePart(31, 40)]),
		guest: new RangePart(22, 25),
		want: "[10, 20) [31, 40)",
	},
	{
		name: "test RangeList.remove-6.Guest在RangeList右侧：r...r.g..g",
		r: new RangeList([new RangePart(10, 20), new RangePart(31, 40)]),
		guest: new RangePart(50, 60),
		want: "[10, 20) [31, 40)",
	},
]
casesForRemove.forEach(element => {
	test(element.name, () => {
		element.r.remove(element.guest)
		expect(element.r.toString()).toBe(element.want)
	})
})

let casesForToString = [

	{
		name: "空值",
		target: new RangeList([new RangePart(1, 1)]),
		want: ""
	},
	{
		name: "一个",
		target: new RangeList([new RangePart(1, 10)]),
		want: "[1, 10)",
	},
	{
		name: "两个",
		target: new RangeList([new RangePart(1, 10), new RangePart(15, 30)]),
		want: "[1, 10) [15, 30)"
	},
]
casesForToString.forEach(element => {
	expect(element.target.toString()).toBe(element.want)
})
