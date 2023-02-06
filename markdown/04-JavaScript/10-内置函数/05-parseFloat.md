# parseFloat

<div class="o">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat</div>

```JavaScript
parseFloat(string)
```

将任何值转换成浮点类型输出，转换失败会返回 `NaN`。

<div class="run"></div>

```JavaScript
var a = "123";
var b = "abc1.23";
var c = "1.23abc23";
var d = "1.23abc";
var e = "1.23";

console.log(parseFloat(a));
console.log(parseFloat(b));
console.log(parseFloat(c));
console.log(parseFloat(d));
console.log(parseFloat(e));
```
