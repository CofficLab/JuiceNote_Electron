import { createApp } from 'vue'
import App from './layouts/App.vue'
import Home from './pages/Home.vue'
import Lesson from './pages/Lesson.vue'
import About from './pages/About.vue'
import Shop from './pages/Shop.vue'
import NotFound from './pages/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import "./app.css"
import { Node } from './entities/Node'
import MonacoBox from './extensions/CodeEditor/MonacoBox'

// 定义路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      children: [
        { path: '/', component: Home, name: "home.show" },
        { path: '/edit', component: Home, name: "home.edit" }
      ]
    },
    { path: '/about', component: About, name: "about" },
    {
      path: '/lessons/:id',
      children: [
        { path: 'edit', component: Lesson, name: "lessons.edit" },
        { path: 'show', component: Lesson, name: "lessons.show" },
      ]
    },
    {
      path: '/shop',
      children: [
        { path: '', component: Shop, name: "shop" },
      ]
    },
  ],
})

router.beforeEach(function (to, from) {
  // console.log("从", from.fullPath, "到", to.fullPath)

  // 如果不是page，跳转到第一个page子节点
  if (to.name == 'lessons.show') {
    let node = Node.find(parseInt(to.params.id.toString()))

    if (!node.isPage && node.getFirstPage().id > 0) {
      return {
        name: "lessons.show",
        params: { id: node.getFirstPage().id }
      }
    }
  }

  // 如果是编辑模式
  if (from.name == 'lessons.edit' && to.name == 'lessons.show' && from.params.id != to.params.id) {
    return {
      name: "lessons.edit",
      params: { id: to.params.id }
    }
  }
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(router)
app.mount('#app')

export interface CreateEditorOptions {
  target: HTMLDivElement;
  content: string;
  language: string;
  readOnly: boolean;
  runnable: boolean;
  showLineNumbers: boolean;
  onCreated?: (editor: MonacoBox) => void;
  onContentChanged?: (editor: MonacoBox) => void;
  onRunnableChanged?: (value: boolean) => void;
  onLanguageChanged?: (editor: MonacoBox) => void;
}

window.createMonaco = function (box: MonacoBox, options: CreateEditorOptions) {
  console.log('active monaca')
  window.require(["vs/editor/editor.main"], () => {
    const editor = window.monaco.editor.create(options.target, {
      value: options.content,
      language: options.language,
      readOnly: options.readOnly,
      theme: "vs-dark",
      fontSize: 14,
      lineNumbers: options.showLineNumbers ? "on" : "off",
      automaticLayout: true,
      scrollBeyondLastLine: false,
      contextmenu: false,
      tabSize: 4,
      roundedSelection: false,
      renderLineHighlight: "none",
      formatOnPaste: true,
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
        alwaysConsumeMouseWheel: false,
      },
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      domReadOnly: false,
      stickyScroll: {
        enabled: false,
      },
      padding: {
        top: options.readOnly ? 10 : 10,
        bottom: options.readOnly ? 10 : 50,
      },
      minimap: { enabled: false },
    });

    box = new MonacoBox(editor, window.monaco.editor.getModels().length - 1, options.runnable);

    if (options?.onCreated != undefined) box.onCreated(options.onCreated);
    if (options?.onContentChanged != undefined) box.onContentChanged(options.onContentChanged);
    if (options?.onLanguageChanged != undefined) box.onLanguageChanged(options.onLanguageChanged);
    if (options?.onRunnableChanged != undefined) box.onRunnableChanged(options.onRunnableChanged);
  });
}