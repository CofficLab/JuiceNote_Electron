# Array

<div class="o">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array</div>

## 声明

<div class="run"></div>

```JavaScript
let staff = ["佟湘玉", "白展堂", "莫小贝"];

console.log(typeof staff, staff);
```

还有一种方式：

<div class="run"></div>

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");

console.log(typeof staff, staff);
```

既然第一种方式更简单，为什么还要存在第二种方式呢？

在 JavaScript 内部：

```JavaScript
let staff = ["佟湘玉", "白展堂", "莫小贝"];
```

会自动转换成：

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");
```

第二种方式揭示了 JavaScript 的内部原理，第一种方式更像一种方便人类的快捷方式。

## 属性

按照官方文档的描述，数组有多个属性。

部分列举如下。

### 长度

每个数组都有一个 `length` 属性，表示数组中元素的个数。

<div class="run"></div>

```JavaScript
let staff = ["佟湘玉", "白展堂", "莫小贝"];

console.log(staff.length);
```

## 方法

### at

```javaScript
at(index)
```

at() 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

<div class="run"></div>

```javaScript
const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`Using an index of ${index} the item returned is ${array1.at(index)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${array1.at(index)}`);
// Expected output: "Using an index of -2 item returned is 130"

```

### slice

```javaScript
slice()
slice(start)
slice(start, end)
```

slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。

<div class="run"></div>

```javaScript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

## 场景

### 访问元素

<div class="run"></div>

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");

console.log(staff[0]);
console.log(staff[2]);
```

<div class="ask">如何访问最后一个元素？</div>

使用数组的`at`方法：

<div class="run"></div>

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");

console.log(staff.at(-1));
```

复杂一些的，还可以这样：

<div class="run"></div>

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");

console.log(staff[staff.length - 1]);
```

### 修改元素

<div class="run"></div>

```JavaScript
let staff = new Array("佟湘玉", "白展堂", "莫小贝");
staff[2] = '燕小六'

console.log(staff[2]);
console.log(staff)
```

### 删除

<div class="run"></div>

```javaScript
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants);
console.log(plants.pop());
console.log(plants);
plants.pop();
console.log(plants);
```

pop 方法从一个数组中删除并返回最后一个元素。

如果要删除指定的元素，可以使用 delete 关键字。

<div class="run"></div>

```JavaScript
let stuff = ["佟湘玉", "白展堂", "莫小贝", "刑育森"];

delete stuff[2];

console.log(stuff);
```

### 遍历

- for

  <div class="run"></div>

  ```JavaScript
  let staff = ["佟湘玉", "白展堂", "莫小贝"];

  // 第一种方法
  for (let i = 0; i < staff.length; i = i + 1) {
    console.log(staff[i]);
  }
  ```

- foreach

  <div class="run"></div>

  ```JavaScript
  let staff = ["佟湘玉", "白展堂", "莫小贝"];

  staff.forEach(function (element) {
    console.log(element);
  });
  ```

- while

  <div class="run"></div>

  ```JavaScript
  let staff = ["佟湘玉", "白展堂", "莫小贝"];

  var x = 0;
  while (x < staff.length) {
    console.log(staff[x]);
    x = x + 1;
  }
  ```

### 搜索

- includes 方法

判断一个数组是否包含一个指定的值，包含则返回 true，否则返回 false。

<div class="run"></div>

```javaScript
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```

- indexOf 方法

返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。

<div class="run"></div>

```javaScript
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1

```

- lastIndexOf 方法

返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。

<div class="run"></div>

```javaScript
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1

```

### 归约（reduce）

通过对数组中的每个值调用提供的函数，实现将整个数组的值变成一个值。

最容易理解的例子就是对数组中所有元素求和。

<div class="run"></div>

```javaScript
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```

### 变成一行字符串

<div class="run"></div>

```javaScript
const arr = [1,2,3,4]
console.log(arr.join("-"))
```

<div class="banner">当你看到一个对象时，第一反应应该是：它有哪些属性和方法，官方文档在哪里</div>
