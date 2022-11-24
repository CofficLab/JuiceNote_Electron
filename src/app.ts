import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './components/App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './app.css'
import store from './models/store'
import Alpine from 'alpinejs'
import fs from 'fs'
import path from 'path'

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
// Alpine.start()

window.runner = function (code = '', language = 'PHP') {
  let suffix = 'unknown'
  switch (language) {
    case 'PHP':
    case 'php':
      suffix = 'php'
      break;

    case 'python':
      suffix = 'py'

    default:
      break;
  }

  // 确定文件内容
  let content = code
  if (suffix == 'php') content = "<?php \r\n" + content

  // 写入临时文件
  let tmpFilePath = path.join(process.cwd(), 'tmp.' + suffix)
  fs.writeFileSync(tmpFilePath, content)

  console.log('language is', language, 'code is')
  console.log(fs.readFileSync(tmpFilePath).toString())

  // 执行文件
  let execSync = require("child_process").execSync;
  let output = ''
  switch (suffix) {
    case 'php':
      output = execSync("php " + tmpFilePath);
      break;
    case 'py':
      try {
        output = execSync("python3 " + tmpFilePath);
      } catch (err) {
        output = err.message.trim()
      }
      break;
    default:
      output = 'unknown'
  }

  return output.toString()
}
