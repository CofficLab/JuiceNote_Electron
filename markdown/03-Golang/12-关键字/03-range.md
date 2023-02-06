# range

## 简介

Go 特有的一种的遍历结构。它可以遍历任何一个 集合（字符串、数组、切片、Map、通道等）。
语法上类似主流编程语言中的 foreach 语句，但可以获得每次遍历对应的索引。

## 语法规则

```go
// key 和 val 也可以使用别的变量名称，比如 index, item 等
for key, val := range collection {
    // do something
}
```

## 遍历规则

其中，key 和 val 都可以使用 空白标识符 省略，具体规则如下:

如果 key 和 val 都保留，那么在循环体中必须使用这 2 个变量，语法如下:

```go
for key, val := range collection {
    // do something
}
```

如果省略 val, 不需要空白标识符，语法如下:

```go
for key := range collection {
    // do something
}
```

如果省略 key, 则 key 的位置需要 空白标识符，语法如下:

```go
for _, val := range collection {
    // do something
}
```

如果 key 和 val 全部省略，那么只执行循环体中的代码，语法如下:

```go
for _, _ = range collection {
    // do something
}
```

## 遍历字符串

### key, val 都保留

<div class="run"></div>

```go
package main

import "fmt"

func main() {
    str := "hello"
    for key, val := range str {
        fmt.Printf("key = %d, val = %c\n", key, val)
    }
}
```

### 省略 key

<div class="run"></div>

```go
package main

import "fmt"

func main() {
    str := "hello"
    for _, val := range str {
        fmt.Printf("val = %c\n", val)
    }
}
```

### 省略 val

<div class="run"></div>

```go
package main

import "fmt"

func main() {
    str := "hello"
    for key := range str {
        fmt.Printf("key = %d\n", key)
    }
}
```

### key, val 都省略

<div class="run"></div>

```go
package main

func main() {
    str := "hello"
    for _, _ = range str {
        println("do something")
    }
}
```

## 小结

本小节只使用 字符串 作为演示，对于其他的数据结构 （数组、切片、Map、通道等）， range 语法都差不多。
后面介绍其他数据结构时，会附加使用 range 遍历操作的内容。
