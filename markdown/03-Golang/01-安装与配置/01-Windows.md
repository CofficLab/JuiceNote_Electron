# Windows

## 下载

1. 打开 Go 官网下载地址 (https://go.dev/dl/)，
2. 选择 Microsoft Windows
3. 点击对应的版本开始下载，比如 go1.19.1.windows-amd64.msi

## 安装

双击下载好的 .msi 文件，然后下一步 -> 下一步 -> 最终完成

## 测试

打开命令行，输入 go version，回车，正常情况下，会输出类似下面的内容

```shell
go version go1.19.1 windows/amd64
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

1. 打开一个目录，比如 D:\Code\Go-Examples

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
go run D:\Code\Go-Examples\main.go,
```

5. 回车，(当然，也可以切换到 D:\Code\Go-Examples, 然后输入 go run main.go)

正常情况下，会输出如下内容

```shell
hello world
```

恭喜你，完成了 Go 的第一个程序。
