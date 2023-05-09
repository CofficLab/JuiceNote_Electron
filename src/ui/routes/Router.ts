import { createRouter, createWebHashHistory } from "vue-router"
import ShopPage from "../pages/ShopPage.vue"
import { NodeApi } from "../api/NodeApi"
import NotFound from '../pages/NotFound.vue'
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import Database from '../pages/Database.vue'
import nodeRoutes from "./NodeRoutes"
import { ShopApi } from "../api/ShopApi"
import { useCurrentNodeStore } from "../stores/NodeStore"
import { EmptyNode } from "../entities/Node"

// 定义路由
const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopPage,
        },
        {
            path: '/database',
            name: 'database',
            component: Database,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound', component: NotFound
        },
        {
            path: '/about', component: About,
            name: "about"
        },
        nodeRoutes
    ],
})

Router.beforeEach(function (to, from) {
    console.log("从", from.fullPath, "到", to.fullPath)

    /**
     * 路由发生变化时，更新store
     */

    let root = EmptyNode
    let current = EmptyNode

    console.log(to.params)
    
    if (to.name == 'shop' || (to.params.source?.toString() == 'shop')) {
        root = ShopApi.getRoot()
        current = to.params.id ? ShopApi.find(to.params.id.toString()) : root
    } else {
        root = NodeApi.getRoot()
        current = to.params.id ? NodeApi.find(to.params.id.toString()) : root
    }

    console.log(root)

    useCurrentNodeStore().updateRoot(root)
    useCurrentNodeStore().update(current.getFirstPage())

    // 如果是编辑模式
    if (from.name == 'nodes.edit' && to.name == 'nodes.show' && from.params.id != to.params.id) {
        return {
            name: "nodes.edit",
            params: { id: to.params.id }
        }
    }
})

export default Router