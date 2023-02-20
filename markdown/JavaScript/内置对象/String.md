# String

<div class="o">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String</div>

## 定义

<div class="run"></div>

```JavaScript
var s = "abc";
console.log(typeof s);
```

## 属性

### 长度

按照官方文档的描述，字符串只有一个属性--长度，可以这样获取：

<div class="run"></div>

```JavaScript
var s = "abc";

console.log(s.length);
```

## 方法

### `concat`

```javaScript
str.concat(str2, [, ...strN])
```

<div class="run"></div>

```JavaScript
var s = "abc";
var p = "123";
console.log(s.concat(p));
```

### `substring`

```javaScript
str.substring(indexStart[, indexEnd])
```

<div class="run"></div>

```javaScript
var s = 'abcdef'

// 输出前 2 个字符
console.log(s.substring(0, 2))
```

## 常见场景

### 截取

<div class="run"></div>

```javaScript
var s = 'abcdef'

// 输出前 2 个字符
console.log(s.substring(0, 2))
```

### 拼接

<div class="run"></div>

```JavaScript
var s = "abc";
var p = "123";
console.log(s.concat(p));
```

官方文档推荐使用“+”来拼接：

<div class="run"></div>

```JavaScript
var a = "老白";
var b = "吃了吗？";

console.log(a + b);
```

通过 `typeof` 来获知数据类型：

<div class="run"></div>

```JavaScript
var s = "龙门飞甲";

console.log(typeof s);
```

### 分割

<div class="run"></div>

```javaScript
const str = 'a b c d';

console.log(str.split(' '));
```

### 填充

<div class="run"></div>

```javascript
const str = "1382345";

console.log(str.padEnd(11, "*"));
```

### 转换

- 转换为数值

    <div class="run"></div>

  ```JavaScript
  x = "3";
  console.log(typeof x);

  y = parseInt(x);
  console.log(y);
  console.log(typeof y);
  ```

- 以某字符串开头

    <div class="run"></div>

  ```javaScript
  var a = 'abcdef'
  console.log(a.startsWith('ab'))
  console.log(a.startsWith(' '))
  console.log(a.startsWith(''))
  ```

### 遍历

- for

    <div class="run"></div>

  ```javaScript
  var a = 'abcdef'
  for (let i = 0; i < a.length; i++) {
  console.log(a[i])
  }
  ```

- for...in

    <div class="run"></div>

  ```javaScript
  var a = 'abcdef'
  for (let i in a) {
  console.log(a[i])
  }
  ```

- for...of

    <div class="run"></div>

  ```javaScript
  var a = 'abcdef'
  for (let element of a) {
  console.log(element)
  }
  ```

### ASCII 码

- 获取某个字符的 ASCII 码

    <div class="run"></div>

  ```javaScript
  var a = 'abcdef'
  console.log(a.charCodeAt(0))
  console.log(a.charCodeAt(3))
  ```

- 获取 ASCII 码对应的字符

    <div class="run"></div>

  ```javaScript
  console.log(String.fromCharCode(97))
  console.log(String.fromCharCode(100))
  ```

### 截取

- substring

    <div class="run"></div>

  ```javaScript
  var s = 'abcdef'

  // 输出前 2 个字符
  console.log(s.substring(0, 2))
  ```

- slice

    <div class="run"></div>

  ```javaScript
  var s = 'abcdef'

  // 输出前 2 个字符
  console.log(s.slice(0, 2))
  ```
