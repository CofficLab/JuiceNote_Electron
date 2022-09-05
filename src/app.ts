import './app.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MarkdownVue from './components/Markdown.vue'

const routes = [
  { path: '/', redirect: '/article/welcome' },
  { path: '/article/:path', component: MarkdownVue, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router).mount('#app')