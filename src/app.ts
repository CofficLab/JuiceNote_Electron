import Alpine from 'alpinejs'
import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import mavonEditor from 'mavon-editor'
import App from './views/App.vue'
import 'mavon-editor/dist/css/index.css'
import "tailwindcss/tailwind.css"
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import 'highlight.js/styles/github-dark.css'
import CodeRunner from './tools/CodeRunner'
import FullScreenController from './controllers/FullScreenController'

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
  Alpine: Alpine,
  runner: CodeRunner
})

const app = createApp(App)
app.use(mavonEditor)
app.mount('#app')


