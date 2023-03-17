import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import FullScreenController from './controllers/FullScreenController'
import "./app.css"
import BookNode from './entities/BookNode'
import Config from './entities/Config'

// 检测全屏状态
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    FullScreenController.enter()
  }

  if (args[0] === 'leave-full-screen') {
    FullScreenController.leave()
  }
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.mount('#app')