import Alpine from 'alpinejs'
import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import CodeRunner from './tools/CodeRunner'
import FullScreenController from './controllers/FullScreenController'
import "tailwindcss/tailwind.css"
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { readFileSync } from 'fs'
import { join } from 'path'
import Config from './entities/Config'
import "../markdown/footer.js";

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
  runner: CodeRunner,
})

const app = createApp(App)
app.mount('#app')





