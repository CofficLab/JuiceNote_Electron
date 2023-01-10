# `strings` 字符串

<div class="o">https://pkg.go.dev/strings@go1.19.4</div>

## 前缀和后缀

`HasPrefix` 用于判断字符串是否以某个字符串开头。

<div class="run"></div>

```go
package main
import "fmt"
import "strings"

func main() {
    fmt.Println(strings.HasPrefix("老白，吃了吗", "老"))
}
```

`HasSuffix` 用于判断字符串是否以某个字符串结尾。

<div class="run"></div>

```go
package main
import "fmt"
import "strings"

func main() {
    fmt.Println(strings.HasSuffix("吃了吗？小六", "六"))
}
```

## 包含关系

`Contains` 用于判断字符串是否包含某个字符串。

<div class="run"></div>

```go
package main
import "fmt"
import "strings"

func main() {
    fmt.Println(strings.Contains("吃了吗？小六", "六"))
}
```

## 大小写转换

<div class="run"></div>

```go
package main
import "fmt"
import "strings"

func main() {
    fmt.Println(strings.ToLower("AbcDEF"))
    fmt.Println(strings.ToUpper("aBcDEF"))
}
```
