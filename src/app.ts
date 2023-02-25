import Alpine from 'alpinejs'
import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import CodeRunner from './tools/CodeRunner'
import FullScreenController from './controllers/FullScreenController'
import "./app.css"
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";

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