# 认识 Golang

Golang（简称 Go） 是一门非常年轻的编程语言。

## 第一个 Go 程序

<div class="run"></div>

```go
package main
import "fmt"

func main() {
    fmt.Println("hello")
}
```

每个编程语言的设计理念都不一样。

我们通过分析这段程序，来理解 Go 的设计理念。

## 包

```go
package main
```

每个 Go 源码文件的开头都必须有`package`声明，表示其中的代码所属的包。

Go 规定，我们写的程序必须有一个`main`包。

<div class="bg-cyan flex flex-col gap-2">
    <div class="flex flex-row gap-2 px-4 justify-center pt-4">
        <div class="flex flex-col bg-yellow">
            <div class="text-center bg-cyan mt-0 pt-0">用户程序1</div>
            <div class="bg-red grid grid-cols-1 p-4 gap-4">
                <div class="brick px-2">main</div>
            </div>
        </div>
        <div class="flex flex-col bg-yellow">
            <div class="text-center bg-cyan mt-0 pt-0">用户程序2</div>
            <div class="bg-red grid grid-cols-3 p-4 gap-4">
                <div class="brick px-2">main</div>
                <div class="brick px-2">log</div>
                <div class="brick px-2">...</div>
            </div>
        </div>
        <div class="flex flex-col bg-yellow">
            <div class="text-center bg-cyan mt-0 pt-0 px-2">用户程序n</div>
            <div class="bg-red grid grid-cols-2 p-4 gap-4">
                <div class="brick px-2">main</div>
                <div class="brick px-2">...</div>
            </div>
        </div> 
    </div>
    <div class="flex flex-col bg-cyan">
        <div class="text-center bg-cyan mt-0 pt-0">内置包</div>
        <div class="bg-red grid grid-cols-6 p-4 gap-4">
            <div class="brick">fmt</div>
            <div class="brick">os</div>
            <div class="brick">path</div>
            <div class="brick">sort</div>
            <div class="brick">time</div>
            <div class="brick">zip</div>
            <div class="brick">md5</div>
            <div class="brick">png</div>
            <div class="brick">...</div>
        </div>
    </div>
</div>

内置包是 Go 本身就有的包，在程序的任何地方都能使用，比如：

- fmt：处理输入输出
- zip：压缩文件
- png：处理`png`图片

内置包就像一个工具箱，里面放置着常用的工具。

这个内置包的集合的官方名称是：**Standard Library**，中文译为：**标准库**。

> 标准库里包含了哪些包？

这个答案在其官方文档里：<a href="https://pkg.go.dev/std" target="_blank">https://pkg.go.dev/std</a>

<div class="banner">一定要学会查询官方文档</div>

## 导入包

```go
import "fmt"
```

如果你要使用一个包，就必须在程序的开头导入要使用的包。

`fmt` 是内置的非常常用的包，主要用于输出内容。

## main 函数

```go
func main() {
    fmt.Println("hello")
}
```

程序的`main`包里必须有一个`main`函数作为程序执行的起点。

这个`main`函数做的事是：

**_使用`fmt`包的`Println`函数，输出`hello`这串字。_**

## 查看本机 Go 程序信息

<div class="run"></div>

```shell
go version
```
