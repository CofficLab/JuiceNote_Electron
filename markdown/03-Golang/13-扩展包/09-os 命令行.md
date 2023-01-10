# `os` 命令行

<div class="o">https://pkg.go.dev/os@go1.19.4</div>

## 简介

调用 os 包即可。

## 获取参数个数，遍历参数

```go

package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Printf("Number of args is %d\n\n", len(os.Args))

    for _, arg := range os.Args {
        fmt.Println(arg)
    }

}

// $ go build main.go
// $ ./main -a -b --c -d
// 输出如下
/**
Number of args is 5

./main
-a
-b
--c
-d
*/
```

## 设置参数

<div class="run"></div>

```go

package main

import (
    "flag"
    "fmt"
)

var (
    name = flag.String("name", "Tom", "Please input your name:") // 默认值 Tom
    age = flag.Int("age", 6, "Please input your age:") // 默认值 6
    hasMoney = flag.Bool("hasMoney", true, "Do you have any money?") // 默认值 true
)

func main() {
flag.PrintDefaults() // 打印参数提示信息
flag.Parse()

    fmt.Printf("name is %s\n", *name)
    fmt.Printf("name is %d\n", *age)
    fmt.Printf("name is %t\n", *hasMoney)

}

// 默认参数
// $ go run main.go
// 输出如下
/*
-age int
Please input your age: (default 6)
-hasMoney
Do you have any money? (default true)
-name string
Please input your name: (default "Tom")
name is Tom
name is 6
name is true
*/

// 设置参数
// $ go run main.go -name=Jerry -age=8 -hasMoney=false
// 输出如下
/*
-age int
Please input your age: (default 6)
-hasMoney
Do you have any money? (default true)
-name string
Please input your name: (default "Tom")
name is Jerry
name is 8
name is false
*/

```
