# math

<div class="o">https://pkg.go.dev/math@go1.19.4</div>

## 求平方根

<div class="run"></div>

```go
package main
import "fmt"
import "math"
import "reflect"

func main() {
    var a float64 = 3*3 + 4*4
    b := math.Sqrt(a)

    fmt.Println(reflect.TypeOf(b), b)
}
```
