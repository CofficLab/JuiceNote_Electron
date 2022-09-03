import './app.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import MarkdownVue from './components/Markdown.vue'

const routes = [
  { path: '/', redirect: '/article/welcome' },
  { path: '/article/:path', component: MarkdownVue, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router).mount('#app')