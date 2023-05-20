import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './layouts/App.vue'
import "./app.css"
import router from './router';
import rendererLogger from './log/rendererLogger';
import Preload from './api/Preload'

rendererLogger.info('开始加载');

Preload.listen("enter-full-screen", () => {
  rendererLogger.info("监测到事件：enter-full-screen");
});

const pinia = createPinia()
const app = createApp(App)

app.config.unwrapInjectedRef = true
app.use(router)
app.use(pinia)
app.mount('#app')