import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/Layout.vue'
import EditorVue from './components/Editor.vue'
import mavonEditor from 'mavon-editor'
import Content from './components/Content.vue'
import 'mavon-editor/dist/css/index.css'
import './app.css'
import store from './models/store'

// 定义路由
const routes = [
  { path: '/', redirect: '/article/welcome@0' },
  { path: '/article/:path', component: Content },
  { path: '/editor/:path', component: EditorVue, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 检测全屏状态
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    store.enterFullScreen()
  }

  if (args[0] === 'leave-full-screen') {
    store.leaveFullScreen()
  }

  // console.log('[main process message]', ...args)
})

const app = createApp(Layout)
app.use(router)
app.use(mavonEditor)
app.mount('#app')