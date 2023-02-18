import './app.css'
import Alpine from 'alpinejs'
import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import runner from './entities/CodeRunner'
import 'highlight.js/styles/github-dark.css'
import FullScreenController from './controllers/FullScreenController'

// 检测全屏状态
ipcRenderer.on('main-process-message', (_event, ...args) => {
  if (args[0] === 'enter-full-screen') {
    FullScreenController.enterFullScreen()
  }

  if (args[0] === 'leave-full-screen') {
    FullScreenController.leaveFullScreen()
  }
})

const app = createApp(App)
app.use(mavonEditor)
app.mount('#app')

Object.assign(window, {
  Alpine: Alpine,
  runner: runner.code_runner
})
