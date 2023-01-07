# Linux

## 下载

1. 打开 Go 官网下载地址 (go.dev/dl/)
2. 根据硬件架构选择 Linux (已编译完成) 或 Source (源代码)，这里以编译完的发行版为例
3. 点击对应的版本压缩包开始下载，比如 go1.19.1.linux-amd64.tar.gz

## 安装

直接将压缩包文件解压到 /usr/local/ 目录

```shell
sudo tar -zxvf go1.19.1.linux-amd64.tar.gz -C /usr/local/
```

## 测试

打开命令行，输入

```shell
go version
```

回车，正常情况下，会输出类似下面的内容

```shell
go version go1.19.1 linux/amd64
```

输入 go，回车，正常情况下，会输出类似下面的内容

```shell
Go is a tool for managing Go source code.
Usage:
go <command> [arguments]
...
...
...
Use "go help <topic>" for more information about that topic.
```

## Hello World

和学习其他编程语言一样，写一个经典例子。

1. 打开一个目录，比如 /home/codes/Go-Examples
2. 新建一个文件 main.go，输入如下代码

```go
package main

func main() {
    println("hello world")
}
```

3. 保存文件
4. 在命令行输入

```go
go run /home/codes/Go-Examples/main.go
```

5. 回车， (当然，也可以切换到 /home/codes/Go-Examples, 然后输入 go run main.go)

正常情况下，会输出如下内容

```shell
hello world
```

恭喜你，完成了 Go 的第一个程序。
