# 认识 JavaScript

JavaScript 是什么？有什么特点？

- 一种可以用来给网页增加交互的高级编程语言；
- 也可以用来做网页的服务端。

常常简称为：JS。

## 特点

- 代码简洁，清晰易懂
- 应用广泛

## JavaScript 与 Java

JavaScript 与 Java 没有关系。

## 运行平台

<div class="bg-cyan flex flex-col gap-2 pt-4">
    <div class="bg-red flex flex-row gap-2 items-end">
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">程序1</div>
                <div class="brick px-2">程序2</div>
                <div class="brick px-2">程序n</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                Node.js<br/>
                <span class="text-sm">让桌面操作系统支持 JavaScript 的平台</span>
            </div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">程序1</div>
                <div class="brick px-2">程序2</div>
                <div class="brick px-2">程序n</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                浏览器<br/>
                <span class="text-sm">支持 JavaScript</span>
            </div>
        </div>
    </div>
    <div class="bg-yellow text-center py-4">
        桌面操作系统（Windows、Linux、macOS）<br/>
        <span class="text-sm">安装 Node.js 后支持 JavaScript </span>
    </div>
    <div class="bg-yellow text-center py-4">计算机</div>
</div>

JavaScript 程序既可以和浏览器打交道用于操作网页，也可以通过`Node.js`这个平台和操作系统打交道。

这是当下最主要的两个应用领域。

> 那么，JavaScript 可以运行在无人机上吗？

可以，只要有人开发类似 Node.js 这样的平台。

也许有一天，JavaScript 无所不能，像这样：

<div class="bg-cyan flex flex-col gap-2 pt-4">
    <div class="bg-red flex flex-row gap-2 items-end overflow-scroll">
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                浏览器
            </div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                Node.js
            </div>
            <div class="bg-yellow text-center py-4">计算机</div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                x.js
            </div>
            <div class="bg-yellow text-center py-4">无人机</div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                y.js
            </div>
            <div class="bg-yellow text-center py-4">洗碗机</div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                z.js
            </div>
            <div class="bg-yellow text-center py-4">汽车</div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                zz.js
            </div>
            <div class="bg-yellow text-center py-4">手机</div>
        </div>
        <div class="flex flex-col w-3/5 gap-1">
            <div class="flex flex-row gap-4 justify-center">
                <div class="brick px-2">众多程序</div>
            </div>
            <div class="bg-sky w-full text-center py-2">
                zzz.js
            </div>
            <div class="bg-yellow text-center py-4">飞机</div>
        </div>
    </div>
</div>

不过，其中的某些领域早已被其他编程语言“占领”。

## 浏览器中的 JS

运行在浏览器中的 JavaScript 可以操作网页，比如：

- 显示弹幕
- 显示倒计时
- 显示过渡动画

这些功能是 Python、Java、Golang、PHP 等其他编程语言所不擅长做的事。

事实上，目前只有 JavaScript 能做。

## 桌面操作系统中的 JS

运行在桌面操作系统中的 JavaScript 功能更加强大，比如：

- 开发网页的服务端软件
- 开发桌面 APP
- 开发命令行工具

这也是 Python、Java、Golang、PHP 等其他编程语言擅长做的事。

## 手机操作系统中的 JS

JavaScript 能够运行在手机操作系统的浏览器中，但不能用于开发手机端的 APP。

## 查看本机 JS 程序信息

<div class="run"></div>

```shell
node -v
```
