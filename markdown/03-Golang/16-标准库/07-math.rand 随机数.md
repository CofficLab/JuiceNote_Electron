# `math/rand` 随机数

<div class="o">https://pkg.go.dev/math/rand@go1.19.4</div>

## 随机数字

<div class="run"></div>

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano()) // 以当前时间的纳秒单位为种子

    for i := 0; i < 5; i++ {
        fmt.Println(rand.Int())
    }
}
```

## 指定区间

<div class="run"></div>

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    s := rand.NewSource(time.Now().UnixNano()) // 以当前时间的纳秒单位为种子
    r := rand.New(s)

    for i := 0; i < 5; i++ {
        fmt.Println(r.Intn(10))
    }
}
```
