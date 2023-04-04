import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import Home from './views/pages/Home.vue'
import Lesson from './views/pages/Lesson.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import FullScreenController from './controllers/FullScreenController'
import "./app.css"

// 检测全屏状态
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    FullScreenController.enter()
  }

  if (args[0] === 'leave-full-screen') {
    FullScreenController.leave()
  }
})

// 定义路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lessons/:id', component: Lesson },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 如果 URL 中包含哈希部分，则滚动到相应的锚点
        if (to.hash) {
          console.log('滚动到', to.hash)
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        } else {
          // 否则，返回页面顶部
          console.log('滚动到页面顶部')
          // return { x: 0, y: 0 };
          resolve({ left: 0, top: 0 })
        }
      }, 1500)
    })
  }
})

router.beforeEach(function (to, from) {
  // 如果是编辑模式，路由里需要加入editable=1
  if (from.query.editable?.toString() == "1" && (to.query.editable?.toString() == "" || to.query.editable == undefined)) {
    return { path: to.path, query: { editable: 1 } }
  }
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(router)
app.mount('#app')