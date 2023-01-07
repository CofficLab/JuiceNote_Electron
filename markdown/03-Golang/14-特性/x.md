# 可见性与作用域

可见性

包通过 导出 机制控制 变量、结构体、函数 等数据可见性。

只有 1 个简单的规则: 首字母大写，可导出，首字母小写，不可导出。 也就是说，Go 的访问控制只有两种模式:

包内可见
全局可见
例子

package hello

var (
privateName string // 只能包内访问
PublicName string // 包内，包外都可以访问
)
作用域

词法块 是指由大括号围起来的一个语句序列，比如 for 循环语句块，if/else 判断语句块。
在 语句块 内部声明的变量对外部不可见，块把声明围起来，决定了它的作用域。

一个程序可以包含多个相同名称的变量，只要这些变量处在不同的 语句块 内。
虽然语法上支持，但是实践中不建议这样做。

全局变量

全局变量根据 可见行 规则，决定在包内可用还是全局可用。

package main

import "fmt"

var (
number = 1024
)

func main() {
// 直接访问全局变量
fmt.Printf("number = %d\n", number)

    // 循环内访问全局变量
    for i := 0; i < 1; i++ {
        fmt.Printf("number = %d\n", number)
    }

}

// $ go run main.go
// 输出如下
/\*_
number = 1024
number = 1024
_/
局部变量

不同的层级作用域

外层定义的变量在内层可以使用，内层定义的变量外层不可以使用。
常见的 if, for 等都是不同的代码块， 每个代码块组成了一个层级。

package main

func main() {
number := 1024

    if number > 0 { // 第 1 层
        for i := 0; i < 10; i++ { // 第 2 层
            if i > 5 { // 第 3 层
                for j := 0; j < 10; j++ { // 第 4 层

                }
            }
        }
    }

}
如上代码组成了 4 个层级，其中:

变量 number 在每个层级都可以使用
变量 i 只在第 2 层级，第 3 层级可以使用
变量 j 只在第 4 层级可以使用
内层变量覆盖外层变量

如果在内层和外层块都存在相同名称的变量，那么内层变量会覆盖外层变量。

package main

import "fmt"

func main() {
number := 1024
fmt.Printf("number = %d\n", number)

    // 循环内部覆盖变量
    // 这里只是为了做演示，实践中建议区分变量名称
    for i := 0; i < 1; i++ {
        number := 1025
        fmt.Printf("number = %d\n", number)
    }

}

// $ go run main.go
// 输出如下
/\*_
number = 1024
number = 1025
_/
小结

为了节省篇幅，本小结所有的声明均以变量为例子，所有规则同样适用于常量、结构体、函数等其他声明。
