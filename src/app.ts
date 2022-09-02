import './app.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import fs from 'fs'
import path from 'path'
import MarkdownVue from './components/Markdown.vue'

const r = fs.readFileSync(path.join(process.cwd(), '/src/routes.json'), 'utf-8')
const p = JSON.parse(r)
var routesInArray: { path: any; component: any }[] = []

p.forEach((element: any) => {
	routesInArray.push({
		path: element.path,
		component: element.component
	})
});

console.log(routesInArray)

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
