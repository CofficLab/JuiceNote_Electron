import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './layouts/App.vue'
import "./app.css"
import Router from './routes/Router'
import log from 'electron-log/renderer';

log.info('渲染进程开始加载');

const pinia = createPinia()
const app = createApp(App)

app.config.unwrapInjectedRef = true
app.use(Router)
app.use(pinia)
app.mount('#app')