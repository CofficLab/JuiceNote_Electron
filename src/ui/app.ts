import { createApp } from 'vue'
import App from './layouts/App.vue'
import Home from './pages/Home.vue'
import Lesson from './pages/Lesson.vue'
import About from './pages/About.vue'
import Shop from './pages/Shop.vue'
import NotFound from './pages/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import "./app.css"
import { Node, NodeApi } from './entities/Node'

// 定义路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      children: [
        { path: '/', component: Home, name: "home.show" },
        { path: '/edit', component: Home, name: "home.edit" }
      ]
    },
    { path: '/about', component: About, name: "about" },
    {
      path: '/lessons/:id',
      children: [
        { path: 'edit', component: Lesson, name: "lessons.edit" },
        { path: 'show', component: Lesson, name: "lessons.show" },
      ]
    },
    {
      path: '/shop',
      children: [
        { path: '', component: Shop, name: "shop" },
      ]
    },
  ],
})

router.beforeEach(function (to, from) {
  // console.log("从", from.fullPath, "到", to.fullPath)

  // 如果不是page，跳转到第一个page子节点
  if (to.name == 'lessons.show') {
    let node = NodeApi.find(parseInt(to.params.id.toString()))

    if (!node.isPage && node.getFirstPage().id > 0) {
      return {
        name: "lessons.show",
        params: { id: node.getFirstPage().id }
      }
    }
  }

  // 如果是编辑模式
  if (from.name == 'lessons.edit' && to.name == 'lessons.show' && from.params.id != to.params.id) {
    return {
      name: "lessons.edit",
      params: { id: to.params.id }
    }
  }
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(router)
app.mount('#app')