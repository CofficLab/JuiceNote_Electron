# macOS

## 下载

1. 打开 Go 官网下载地址 <div class="link">https://go.dev/dl/</div>
2. 根据硬件架构选择 Apple macOS (ARM64) 或 Apple macOS (x86-64)
3. 点击对应的版本开始下载，比如 go1.19.1.darwin-arm64.pkg

## 安装

双击下载好的 .pkg 文件，后续过程和安装其他 Mac App 一样

## 测试

打开命令行，输入 go version，回车，正常情况下，会输出类似下面的内容

```shell
go version go1.19.1 darwin/arm64
```

输入 go，回车，正常情况下，会输出类似下面的内容

```shell
Go is a tool for managing Go source code.
Usage:
go <command> [arguments]
The commands are:
...
...
...
Use "go help <topic>" for more information about that topic.
```

## Hello World

和学习其他编程语言一样，写一个经典例子。

1. 打开一个目录，比如 /Users/codes/Go-Examples
2. 新建一个文件 main.go，输入如下代码

```go
package main

func main() {
    println("hello world")
}
```

3. 保存文件
4. 在命令行输入

```shell
go run /Users/codes/Go-Examples/main.go,
```

5. 回车， (当然，也可以切换到 /Users/codes/Go-Examples, 然后输入 go run main.go)

正常情况下，会输出如下内容

```shell
hello world
```

恭喜你，完成了 Go 的第一个程序。
