import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './components/App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './app.css'
import store from './models/store'
import Alpine from 'alpinejs'

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

// if (window.location.protocol === 'file:' && window.location.href.includes("index.html")) {
//   store.goto('/')
// }

const app = createApp(App)
app.use(mavonEditor)
app.mount('#app')

window.Alpine = Alpine
Alpine.start()