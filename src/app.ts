import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MarkdownVue from './components/Markdown.vue'
import EditorVue from './components/Editor.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './app.css'
import { ipcRenderer } from 'electron'

const routes = [
  { path: '/', redirect: '/article/welcome' },
  { path: '/article/:path', component: MarkdownVue, props: true },
  { path: '/editor/:path', component: EditorVue, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(mavonEditor)
app.mount('#app')

ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    console.log('enter full screen')

    app.hideTitleBar = true

    console.log(app)
  }
})

ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'leave-full-screen') {
    console.log('leave full screen')
    app._component.data = function () {
      return {
        hideTitleBar: false
      }
    }
  }
})