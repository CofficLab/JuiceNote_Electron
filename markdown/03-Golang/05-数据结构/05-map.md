# map

## 简介

维基百科里对 map 的定义：

> In computer science, an associative array, map, symbol table, or dictionary is an abstract data type composed of a collection of (key, value) pairs, such that each possible key appears at most once in the collection.

翻译成中文：

> 在计算机科学里，map 被称为相关数组、map、符号表或者字典，是由一组 <key, value> 对组成的抽象数据结构，，并且同一个 key 只会出现一次。

有两个关键点：

- map 是由 key-value 对组成的；
- key 只会出现一次。

在不同的编程语言中有不同的名字：

| 编程语言 | 英文 | 中文      |
| -------- | ---- | --------- |
| Go       | Map  | Map、映射 |
| Python   | Dict | 字典      |

## 操作

和 map 相关的操作主要是：

- 增加一个 k-v 对 —— Add or insert
- 删除一个 k-v 对 —— Remove or delete
- 修改某个 k 对应的 v —— Reassign
- 查询某个 k 对应的 v —— Lookup

简单说就是最基本的 增删查改。

## 声明

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"

func main() {
    stuff := make(map[string]string)

    stuff["掌柜"] = "佟湘玉"
    stuff["厨师"] = "李大嘴"
    stuff["账房"] = "吕轻侯"
    stuff["跑堂"] = "白展堂"

    fmt.Println(reflect.TypeOf(stuff))
    fmt.Println("掌柜是",stuff["掌柜"])
}
```

<div class="run"></div>

```go
package main
import "fmt"
import "reflect"

func main() {
    ages := make(map[string]int)

    ages["佟湘玉"] = 28
    ages["李大嘴"] = 22
    ages["吕轻侯"] = 23
    ages["白展堂"] = 27

    fmt.Println(reflect.TypeOf(ages))
    fmt.Println("白展堂的年龄是", ages["白展堂"])
}
```

## 获取或改变值

```go
package main

import "fmt"

func main() {
    var m = make(map[string]int)

    fmt.Printf("Map 长度 = %d\n", len(m))

    m["zero"] = 0
    m["one"] = 1
    m["two"] = 2

    fmt.Printf("Map 长度 = %d\n", len(m))

    fmt.Printf("zero = %T, %v\n", m["zero"], m["zero"])
    fmt.Printf("one = %T, %v\n", m["one"], m["one"])
    fmt.Printf("two = %T, %v\n", m["two"], m["two"])
}

// $ go run main.go
// 输出如下
/**
  Map 长度 = 0
  Map 长度 = 3
  zero = int, 0
  one = int, 1
  two = int, 2
*/
```

## 删除元素

```go
package main

import "fmt"

func main() {
    var m = make(map[string]int)

    fmt.Printf("Map 长度 = %d\n", len(m))

    m["zero"] = 0
    m["one"] = 1
    m["two"] = 2

    fmt.Printf("Map 长度 = %d\n", len(m))

    delete(m, "one")
    delete(m, "two")

    fmt.Printf("Map 长度 = %d\n", len(m))
}

// $ go run main.go
// 输出如下
/**
  Map 长度 = 0
  Map 长度 = 3
  Map 长度 = 1
*/
```

## 判断元素是否存在

```go
package main

func main() {
    var m = make(map[string]int)

    m["zero"] = 0
    m["one"] = 1
    m["two"] = 2

    if _, ok := m["zero"]; ok {
        println(`m["zero"] 元素存在`)
    }

    delete(m, "zero")

    if _, ok := m["zero"]; !ok {
        println(`m["zero"] 元素不存在`)
    }
}

// $ go run main.go
// 输出如下
/**
  m["zero"] 元素存在
  m["zero"] 元素不存在
*/
```

## 遍历

重要的一点是: Map 遍历是无序的。 所以不能依赖于遍历的顺序，不论是 键 还是 值，
如果需要遍历时永远保持相同的顺序，需要提前将 键 做排序处理，参考 有序 Map 小节。

```go
package main

import "fmt"

func main() {
    var m = make(map[string]int)

    m["zero"] = 0
    m["one"] = 1
    m["two"] = 2

    for k, v := range m {
        fmt.Printf("key = %s, val = %d\n", k, v)
    }

    println("\n遍历 3 次，每次输出的结果可能不一样\n")
    for i := 0; i < 3; i++ {
        for k, v := range m {
            fmt.Printf("key = %s, val = %d\n", k, v)
        }
        fmt.Printf("第 %d 次遍历完成\n\n", i+1)
    }
}

// $ go run main.go
// 输出如下
/**
  key = zero, val = 0
  key = one, val = 1
  key = two, val = 2

  遍历 3 次，每次输出的结果可能不一样

  key = one, val = 1
  key = two, val = 2
  key = zero, val = 0
  第 1 次遍历完成

  key = zero, val = 0
  key = one, val = 1
  key = two, val = 2
  第 2 次遍历完成

  key = one, val = 1
  key = two, val = 2
  key = zero, val = 0
  第 3 次遍历完成
*/
```

## 有序 Map

Map 的遍历是无序的，这意味着不能依赖遍历的键值顺序。如果想实现 Map 遍历时顺序永远一致，
一个折中的方案时预先给 Map 的 键 排序，然后根据排序后的键序列遍历 Map, 这样可以保证每次遍历顺序都是一样的。

<div class="run"></div>

```go
package main

import (
    "fmt"
    "sort"
)

func main() {
    var m = make(map[int]string)

    m[0] = "zero"
    m[1] = "one"
    m[2] = "two"

    keys := make([]int, len(m)) // 将所有的键放入一个切片中
    index := 0
    for k, _ := range m {
        keys[index] = k
        index++
    }

    sort.Ints(keys) // 将所有的键进行排序

    for i := 0; i < 5; i++ {
        for _, key := range keys { // 根据排序后的键遍历 Map
            fmt.Printf("key = %d, val = %s\n", key, m[key])
        }
        fmt.Printf("第 %d 次遍历完成\n", i+1)
    }
}

// $ go run main.go
// 输出如下
/**
  key = 0, val = zero
  key = 1, val = one
  key = 2, val = two
  第 1 次遍历完成
  key = 0, val = zero
  key = 1, val = one
  key = 2, val = two
  第 2 次遍历完成
  key = 0, val = zero
  key = 1, val = one
  key = 2, val = two
  第 3 次遍历完成
  key = 0, val = zero
  key = 1, val = one
  key = 2, val = two
  第 4 次遍历完成
  key = 0, val = zero
  key = 1, val = one
  key = 2, val = two
  第 5 次遍历完成
*/
```

## 并发不安全

最后要说明的很重要的一点是: Map 不是并发安全的， 也就是说，如果在多个线程中，同时对一个 Map 进行读写，会报错。
互斥锁 提供了一个简单的解决方案。
