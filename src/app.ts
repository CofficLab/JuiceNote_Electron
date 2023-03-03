import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import CodeRunner from './tools/CodeRunner'
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

Object.assign(window, {
  runner: CodeRunner,
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.mount('#app')