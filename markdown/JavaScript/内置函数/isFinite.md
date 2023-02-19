# isFinite

<div class="o">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite</div>

```JavaScript
isFinite(testValue)
```

用于确定某个值是否是一个既非 `Infinity` 也非 `NaN` 的数字。

<div class="run"></div>

```JavaScript
console.log(isFinite(Infinity));
console.log(isFinite(-Infinity));
console.log(isFinite(12));
console.log(isFinite(1e30));
console.log(isFinite(1e309));
```

`1e309` 超过了 JavaScript 中的最大数字，视作无穷。
