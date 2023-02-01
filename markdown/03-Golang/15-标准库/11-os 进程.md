# `os` 进程

<div class="o">https://pkg.go.dev/os@go1.19.4</div>

## 简介

调用 os 包即可。

## 退出程序

<div class="run"></div>

```go
package main

import "os"

func main() {
    os.Exit(3)

    println("exiting ...") // 不会执行到这里
}

// $ go run main.go
// 输出如下
/**
  exit status 3
*/
```

## 进程 ID

<div class="run"></div>

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Printf("Process ID = %d\n", os.Getpid())
    fmt.Printf("Parent process ID = %d\n", os.Getppid())
}

// $ go run main.go
// 输出如下，你的输出可能和这里的不一样
/**
  Process ID = 13962
  Parent process ID =  13860
*/
```

## 信号

```go
package main

import (
    "fmt"
    "os"
    "os/signal"
)

func main() {
    c := make(chan os.Signal, 1)
    signal.Notify(c, os.Interrupt)

    fmt.Println("程序执行中... 按 Ctrl + C 终止执行")

    <-c // 等待信号被触发
    fmt.Println("程序执行终止")
}

// $ go run main.go
// 输出如下
/**
  程序执行中... 按 Ctrl + C 终止执行
  ^C程序执行终止
*/
```

SIGKILL 信号 和 SIGSTOP 信号无法被捕获，这是内核的限制， 目的是为了让操作系统控制进程的生命周期。

## 执行命令

```go
package main

import (
    "fmt"
    "os/exec"
)

func main() {
    out, err := exec.Command("date").Output()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%s\n", out)

    out, err = exec.Command("git", "--version").Output()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%s\n", out)
}

// $ go run main.go
// 输出如下，你的输出可能和这里的不一样
/**
  Thu Nov  3 08:14:57 CST 2022

  git version 2.30.1 (Apple Git-130)
*/
```
