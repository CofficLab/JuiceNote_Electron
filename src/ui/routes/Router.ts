import { createRouter, createWebHashHistory } from "vue-router"
import shopRoutes from "./ShopRoute"
import { NodeApi } from "../api/NodeApi"
import lessonsRoutes from "./LocalRoute"
import NotFound from '../pages/NotFound.vue'
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

// 定义路由
const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound', component: NotFound
        },
        {
            path: '/about', component: About,
            name: "about"
        },
        shopRoutes,
        lessonsRoutes,
    ],
})

Router.beforeEach(function (to, from) {
    // console.log("从", from.fullPath, "到", to.fullPath)

    // 如果不是page，跳转到第一个page子节点
    if (to.name == 'local.lessons.show') {
        let node = NodeApi.find(parseInt(to.params.id.toString()))

        if (!node.isPage && node.getFirstPage().id > 0) {
            return {
                name: "local.lessons.show",
                params: { id: node.getFirstPage().id }
            }
        }
    }

    // 如果是编辑模式
    if (from.name == 'lessons.edit' && to.name == 'local.lessons.show' && from.params.id != to.params.id) {
        return {
            name: "lessons.edit",
            params: { id: to.params.id }
        }
    }
})

export default Router