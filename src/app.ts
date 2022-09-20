import { createApp } from 'vue'
import { createStore } from 'vuex'
import { ipcRenderer } from 'electron'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/Layout.vue'
import EditorVue from './components/Editor.vue'
import mavonEditor from 'mavon-editor'
import Content from './components/Content.vue'
import 'mavon-editor/dist/css/index.css'
import './app.css'
import SortVue from './components/Sort.vue'
import { nav, navigatorNode } from './models/nav'

// 定义路由
const routes = [
  { path: '/', redirect: '/article/welcome@home' },
  { path: '/article/:path', component: Content },
  { path: '/editor/:path', component: EditorVue },
  { path: '/sort', component: SortVue }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 定义 store 实例
const store = createStore({
  state() {
    return {
      full_screen: false,
      sort_mode: false,
      navigators: nav.getNavigators()
    }
  },
  mutations: {
    setFullScreen(state) {
      state.full_screen = true
    },
    setNotFullScreen(state) {
      state.full_screen = false
    },
    setSortMode(state) {
      state.sort_mode = true
    },
    exitSortMode(state) {
      state.sort_mode = false
    },
    updateNavigators(state, navigators) {
      // console.log('update navigators')
      state.navigators = navigators
      nav.update(navigators)
    }
  }
})

// 检测全屏状态
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    store.commit('setFullScreen')
  }

  if (args[0] === 'leave-full-screen') {
    store.commit('setNotFullScreen')
  }

  // console.log('[main process message]', ...args)
})

// 检测排序状态
if (window.location.pathname.indexOf('sort') > 0) {
  store.commit('setSortMode')
}

const app = createApp(Layout)
app.use(router)
app.use(mavonEditor)
app.use(store)
app.mount('#app')