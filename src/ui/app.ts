import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './layouts/App.vue'
import "./app.css"
import lessonsRouter from './routes/LessonsRoute'

const router = lessonsRouter
const pinia = createPinia()
const app = createApp(App)

app.config.unwrapInjectedRef = true
app.use(router)
app.use(pinia)
app.mount('#app')