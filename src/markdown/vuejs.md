# Vue.js

## Vue.js 是什么

单独来讲，Vue.js 被定义成一个用来开发 Web 界面的前端库，是个非常轻量级的工具。 Vue.js 本身具有响应式编程和组件化的特点。
所谓响应式编程 , 即为保持状态和视图的同步，这个在大多数前端 MV*(MVC/MVVM/ MVW)框架，不管是早期的 backbone.js 还是现在 AngularJS 都对这一特性进行了实现(也 称之为数据绑定)，但这几者的实现方式和使用方式都不相同。相比而言，Vue.js 使用起来更 为简单，也无需引入太多的新概念，声明实例 new Vue({ data : data }) 后自然对 data 里面 的数据进行了视图上的绑定。修改 data 的数据，视图中对应数据也会随之更改。
  
Vue.js 的组件化理念和 ReactJS 异曲同工——“一切都是组件”，可以将任意封装好的代
第 1 章 Vue.js 简介
码注册成标签，例如:Vue.component('example', Example)，可以在模板中以 <example></ example> 的形式调用。如果组件抽象得合理，这在很大程度上能减少重复开发，而且配合 Vue.js 的周边工具 vue-loader，我们可以将一个组件的 CSS、HTML 和 js 都写在一个文件里， 做到模块化的开发。
除此之外，Vue.js 也可以和一些周边工具配合起来，例如 vue-router 和 vue-resource， 支持了路由和异步请求，这样就满足了开发单页面应用的基本条件。