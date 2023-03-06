import { createApp } from 'vue'
import { ipcRenderer } from 'electron'
import App from './views/App.vue'
import CodeRunner from './tools/CodeRunner'
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

Object.assign(window, {
  runner: CodeRunner,
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.mount('#app')

// const db = require('better-sqlite3')('database.db');
// let root = new BookNode(Config.markdownRootPath)
// root.getChildren().forEach((child, index) => {
//   save(0, child, index)
// });

// function save(parentId: number, bookNode: BookNode, index: number) {
//   let node = db.prepare('insert into nodes (parent_id,title,content,is_book,is_chapter,is_page,priority) values (?,?,?,?,?,?,?)').run(
//     parentId, bookNode.name, bookNode.isPage() ? bookNode.getSourceCode() : '', bookNode.isBook() ? 1 : 0, bookNode.isChapter() ? 1 : 0, bookNode.isPage() ? 1 : 0, index)

//   bookNode.getChildren().forEach((child, index) => {
//     save(node.lastInsertRowid, child, index)
//   })
// }