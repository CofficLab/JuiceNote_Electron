# Kuaiyizhi

一套软件工程领域的教程，也是编程实践时的知识手册。

![](public/images/app-firstsight.min.png)

## Why

因为我用到的编程语言比较多，不可能把每个编程语言的每个细节都记住，需要经常搜索文档，而公司网络极慢，所以我打算做一个软件来记录各种编程语言的文档。  

也就是打造一个自己维护的、适合自己的知识库。

刚开始我选择了最容易上手的 Electron.js，但当我继续深入时，发现很多功能还是需要原生开发，比如：

- `iCloud` 同步
-  移动端
- 上架到 AppStore

所以最终选择了原生开发，现在可以在这里看到这个产品：  

<https://apps.apple.com/cn/app/%E5%BF%AB%E6%98%93%E7%9F%A5/id6457892799?mt=12>

那么用 XCode 开发 Apple 软件是什么样的感受呢？  

😂。如果你现在用的是`VSCode`、`Vue.js`、`Laravel`等等现代化的工具或框架，你一定是世界上最幸福的开发者。

## Features

🎯 用多彩的文字和图片吸引大脑  
💪 深入浅出，知其然知其所以然  
📦 支持直接在软件内运行样例代码  
🌱 对比式学习，一次学习多个编程语言

## 开发

- 确认环境

  以下环境测试通过：

  - node v16.17.0
  - npm 8.15.0

- 项目初始化

```sh
npm ci
npm install node-gyp@latest -g
npm run rebuild
```

- 运行与调试

```
npm run dev
```

- 查看样式

```
npm run t
```

## Thanks To

- 🖥 [Electron.js](https://www.electronjs.org)
- 🏃 [Vue.js](https://cn.vuejs.org)
- 🌈 [TailwindCSS](https://www.electronjs.org)
- 🍞 [HeroIcons](https://heroicons.com)
- 🎹 [XTerm](https://xtermjs.org)
- 🚄 [node-pty](https://github.com/microsoft/node-pty)
