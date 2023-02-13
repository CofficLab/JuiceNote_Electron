import { describe, expect, test } from "@jest/globals";
import RangePart from "./range";


test("test range_len", () => {
  expect((new RangePart(1, 1)).len()).toBe(0);
  expect((new RangePart(1, 100)).len()).toBe(99);
});

let casesForIsEmpty = [
  {
    host: new RangePart(1, 1),
    want: true,
  },
  {
    host: new RangePart(1, 100),
    want: false,
  }
]
casesForIsEmpty.forEach(element => {
  expect(element.host.isEmpty()).toBe(element.want)
})

let casesForToString = [
  {
    host: new RangePart(1, 1),
    want: "",
  },
  {
    host: new RangePart(100, 1),
    want: "",
  },
  {
    host: new RangePart(1, 100),
    want: "[1, 100)",
  },
]
casesForToString.forEach(element => {
  test('test range.toString-' + element.host, () => {
    expect(element.host.toString()).toBe(element.want)
  })
})

let casesForCut = [
  // 第一部分：host 比 guest 宽，让 guest 不断右移来生成测试用例
  {
    name: "test range.cut-01.相对位置：g..g.h....h",
    host: new RangePart(15, 20),
    guest: new RangePart(10, 13),
    want: "[15, 20)",
  },
  {
    name: "test range.cut-02.相对位置：g..gh....h",
    host: new RangePart(15, 20),
    guest: new RangePart(12, 15),
    want: "[15, 20)",
  },
  {
    name: "test range.cut-03.相对位置：g.h.g...h",
    host: new RangePart(15, 20),
    guest: new RangePart(13, 16),
    want: "[16, 20)",
  },
  {
    name: "test range.cut-04.相对位置：hg..g..h",
    host: new RangePart(15, 20),
    guest: new RangePart(15, 18),
    want: "[18, 20)",
  },
  {
    name: "test range.cut-05.相对位置：h.g..g.h",
    host: new RangePart(15, 20),
    guest: new RangePart(16, 19),
    want: "[15, 16) [19, 20)",
  },
  {
    name: "test range.cut-06.相对位置：h..g..gh",
    host: new RangePart(15, 20),
    guest: new RangePart(17, 20),
    want: "[15, 17)",
  },
  {
    name: "test range.cut-07.相对位置：h...g.h.g",
    host: new RangePart(15, 20),
    guest: new RangePart(19, 22),
    want: "[15, 19)",
  },
  {
    name: "test range.cut-08.相对位置：h....hg..g",
    host: new RangePart(15, 20),
    guest: new RangePart(20, 23),
    want: "[15, 20)",
  },
  {
    name: "test range.cut-09.相对位置：h....h.g..g",
    host: new RangePart(15, 20),
    guest: new RangePart(21, 24),
    want: "[15, 20)",
  },

  // 第二部分：host 比 guest 窄，让 guest 不断右移来生成测试用例
  {
    name: "test range.cut-10.相对位置：g....g..h..h",
    host: new RangePart(15, 18),
    guest: new RangePart(7, 12),
    want: "[15, 18)",
  },
  {
    name: "test range.cut-11.相对位置：g....gh..h",
    host: new RangePart(15, 18),
    guest: new RangePart(10, 15),
    want: "[15, 18)",
  },
  {
    name: "test range.cut-12.相对位置：g...h.g.h",
    host: new RangePart(15, 18),
    guest: new RangePart(11, 16),
    want: "[16, 18)",
  },
  {
    name: "test range.cut-13.相对位置：g..h..gh",
    host: new RangePart(15, 18),
    guest: new RangePart(13, 18),
    want: "",
  },
  {
    name: "test range.cut-14.相对位置：g.h..h.g",
    host: new RangePart(15, 18),
    guest: new RangePart(14, 19),
    want: "",
  },
  {
    name: "test range.cut-15.相对位置：gh..h..g",
    host: new RangePart(15, 18),
    guest: new RangePart(15, 20),
    want: "",
  },
  {
    name: "test range.cut-16.相对位置：h.g.h..g",
    host: new RangePart(15, 18),
    guest: new RangePart(16, 21),
    want: "[15, 16)",
  },
  {
    name: "test range.cut-17.相对位置：h..gh....g",
    host: new RangePart(15, 18),
    guest: new RangePart(18, 23),
    want: "[15, 18)",
  },
  {
    name: "test range.cut-18.相对位置：h..h...g....g",
    host: new RangePart(15, 18),
    guest: new RangePart(22, 27),
    want: "[15, 18)",
  },
]

casesForCut.forEach(element => {
  test(element.name, () => {
    expect(element.host.cut(element.guest).toString()).toBe(element.want)
  })
});

// test range_merge
let casesForMerge = [
  // 第一部分：host 比 guest 宽，让 guest 不断右移
  {
    name: "test range.merge-01.相对位置：g..g.h....h",
    host: new RangePart(15, 20),
    guest: new RangePart(10, 13),
    want: "[10, 13) [15, 20)",
  },
  {
    name: "test range.merge-02.相对位置：g..gh....h",
    host: new RangePart(15, 20),
    guest: new RangePart(12, 15),
    want: "[12, 20)",
  },
  {
    name: "test range.merge-03.相对位置：g.h.g...h",
    host: new RangePart(15, 20),
    guest: new RangePart(13, 16),
    want: "[13, 20)",
  },
  {
    name: "test range.merge-04.相对位置：hg..g..h",
    host: new RangePart(15, 20),
    guest: new RangePart(15, 1),
    want: "[15, 20)",
  },
  {
    name: "test range.merge-05.相对位置：h.g..g.h",
    host: new RangePart(15, 20),
    guest: new RangePart(16, 1),
    want: "[15, 20)",
  },
  {
    name: "test range.merge-06.相对位置：h..g..gh",
    host: new RangePart(15, 20),
    guest: new RangePart(17, 2),
    want: "[15, 20)",
  },
  {
    name: "test range.merge-07.相对位置：h...g.h.g",
    host: new RangePart(15, 20),
    guest: new RangePart(19, 22),
    want: "[15, 22)",
  },
  {
    name: "test range.merge-08.相对位置：h....hg..g",
    host: new RangePart(15, 20),
    guest: new RangePart(20, 23),
    want: "[15, 23)",
  },
  {
    name: "test range.merge-09.相对位置：h....h.g..g",
    host: new RangePart(15, 20),
    guest: new RangePart(21, 24),
    want: "[15, 20) [21, 24)",
  },

  // 第二部分：host 比 guest 窄，让 guest 不断右移
  {
    name: "test range.merge-10.相对位置：g....g..h..h",
    host: new RangePart(15, 18),
    guest: new RangePart(7, 12),
    want: "[7, 12) [15, 18)",
  },
  {
    name: "test range.merge-11.相对位置：g....gh..h",
    host: new RangePart(15, 18),
    guest: new RangePart(10, 15),
    want: "[10, 18)",
  },
  {
    name: "test range.merge-12.相对位置：g...h.g.h",
    host: new RangePart(15, 18),
    guest: new RangePart(11, 16),
    want: "[11, 18)",
  },
  {
    name: "test range.merge-13.相对位置：g..h..gh",
    host: new RangePart(15, 18),
    guest: new RangePart(13, 18),
    want: "[13, 18)",
  },
  {
    name: "test range.merge-14.相对位置：g.h..h.g",
    host: new RangePart(15, 18),
    guest: new RangePart(14, 19),
    want: "[14, 19)",
  },
  {
    name: "test range.merge-15.相对位置：gh..h..g",
    host: new RangePart(15, 18),
    guest: new RangePart(15, 20),
    want: "[15, 20)",
  },
  {
    name: "test range.merge-16.相对位置：h.g.h..g",
    host: new RangePart(15, 18),
    guest: new RangePart(16, 21),
    want: "[15, 21)",
  },
  {
    name: "test range.merge-17.相对位置：h..gh....g",
    host: new RangePart(15, 18),
    guest: new RangePart(18, 23),
    want: "[15, 23)",
  },
  {
    name: "test range.merge-18.相对位置：h..h...g....g",
    host: new RangePart(15, 18),
    guest: new RangePart(22, 27),
    want: "[15, 18) [22, 27)",
  },
]

casesForMerge.forEach(element => {
  test(element.name, () => {
    expect(element.host.merge(element.guest).toString()).toBe(element.want)
  })
})

test('test range_hasCommon', () => {
  let cases = [
    {
      name: "有共同区间",
      host: new RangePart(1, 10),
      guest: new RangePart(2, 20),
      want: true,
    },
    {
      name: "无共同区间",
      host: new RangePart(1, 10),
      guest: new RangePart(20, 30),
      want: false,
    },
  ]

  cases.forEach(element => {
    expect(element.host.hasCommon(element.guest)).toBe(element.want)
  })
})
