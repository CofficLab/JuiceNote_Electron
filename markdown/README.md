# 教程数据库

这个文件夹存储了教程的 markdown 文件，可以在多个项目件共享。

## 注意

展示或渲染时，应忽略本文件。

## 渲染

### Javascript 相关操作

这里的 Markdown 使用了 TailwindCSS 的 Class，以及 AlpineJS 的语法。  
比如可能会有这样的片段：

```
<div x-data="{ open: false }" class="bg-red-300">
    <button @click="open = true">Open Dropdown</button>
    <ul
        x-show="open"
        @click.away="open = false"
    >
        Dropdown Body
    </ul>
</div>
```

所以在渲染时，要保证加载了 AlpineJS 和 TailwindCSS。

### 共用代码

每个 Markdown 文件都使用的代码放在了 `footer.md`，在渲染时需要将 `footer.md` 的内容拼接到原 Markdown 文档底部。

## 测试

<div x-data="{ open: false }" class="bg-sky-500/50 rounded-2xl justify-center flex flex-col">
    <button @click="open = true">点击显示或隐藏内容</button>
    <ul
        x-show="open"
        @click.away="open = false"
    >
        now you see me
    </ul>
</div>
