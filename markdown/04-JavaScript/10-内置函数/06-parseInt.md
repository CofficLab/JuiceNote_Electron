# parseInt

<div class="o">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt</div>

```JavaScript
parseInt(string, radix);
```

将字符串（如果不是字符串则转换为字符串）转换为数值：

<div class="run"></div>

```JavaScript
var a = "123";
var b = "abc123";
var c = "1abc23";
var d = "123abc";

console.log(parseInt(a));
console.log(parseInt(b));
console.log(parseInt(c));
console.log(parseInt(d));
```
