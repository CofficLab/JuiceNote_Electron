import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './layouts/App.vue'
import "./app.css"
import NodeApi from './api/NodeApi'
import { useCurrentNodeStore } from './stores/NodeStore'
import router from './route';
import rendererLogger from './log/rendererLogger';
import Preload from './api/Preload'

rendererLogger.info('开始加载');

rendererLogger.info('异步请求 API 获取 Root 节点')

NodeApi.getRoot().then((root) => {
    rendererLogger.info('root节点为', root.title)
    useCurrentNodeStore().updateRoot(root)
})

Preload.listen("enter-full-screen", (_, args) => {
  rendererLogger.info("监测到事件：enter-full-screen");
});

const pinia = createPinia()
const app = createApp(App)

app.config.unwrapInjectedRef = true
app.use(router)
app.use(pinia)
app.mount('#app')