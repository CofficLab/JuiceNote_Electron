import './app.css'
import { createApp } from 'vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import App from './App.vue'
import NodeJsVue from './views/NodeJs.vue'
import VueJsVue from './views/VueJs.vue'

const routes = [
	{ path: '/node', component: NodeJsVue },
	{ path: '/vue', component: VueJsVue },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

const app = createApp(App)
app.use(router).mount('#app')
