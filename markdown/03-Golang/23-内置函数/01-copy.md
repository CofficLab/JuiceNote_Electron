# copy

<div class="o">https://pkg.go.dev/builtin#copy</div>

```go
func copy(dst, src []Type) int
```

<div class="run"></div>

```go
package main
import "fmt"

func main() {
    a := []int{1,2,3}
    b := []int{}
    c := make([]int, 7)
    d := make([]int, 2)
    e := make([]int, len(a))
    x := a

    copy(b,a)
    copy(c,a)
    copy(d,a)
    copy(e,a)

    fmt.Printf("%[1]p %[1]v\n", a)
    fmt.Printf("%[1]p %[1]v\n", x)
    fmt.Printf("%[1]p %[1]v\n", b)
    fmt.Printf("%[1]p %[1]v\n", c)
    fmt.Printf("%[1]p %[1]v\n", d)
    fmt.Printf("%[1]p %[1]v\n", e)
}
```

## 深拷贝(Deep Copy)

完整复制一份，新旧元素各占一块内存，内存地址也不一样，例如：

<div class="run"></div>

```go
package main
import "fmt"

func main() {
    a := []int{1,2,3}
    b := make([]int, len(a))

    copy(b,a)

    fmt.Printf("%[1]p %[1]v\n", a)
    fmt.Printf("%[1]p %[1]v\n", b)
}
```

## 浅拷贝(Shadow Copy)

```
b := a
```

内存中实际只占一份空间，两者内存地址一致，修改一个也会影响另一个。

<div class="run"></div>

```go
package main
import "fmt"

func main() {
    a := []int{1,2,3}
    b := a

    fmt.Printf("%[1]p %[1]v\n", a)
    fmt.Printf("%[1]p %[1]v\n", b)

    b[0] = 28

    fmt.Printf("%[1]p %[1]v\n", a)
    fmt.Printf("%[1]p %[1]v\n", b)
}
```
