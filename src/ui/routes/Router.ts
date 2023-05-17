import { createRouter, createWebHashHistory } from "vue-router"
import ShopPage from "../pages/ShopPage.vue"
import NotFound from '../pages/NotFound.vue'
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import Database from '../pages/Database.vue'
import nodeRoutes from "./NodeRoutes"
import { useCurrentNodeStore } from "../stores/NodeStore"
import Logger from "electron-log"
import NodeApi from "../api/NodeApi"

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
    /**
     * 路由发生变化时，更新store
     */
    let nodeId = parseInt(to.params.id?.toString())

    Logger.info("从", from.fullPath, "到", to.fullPath)
    Logger.info('从路由中获取的节点ID为', nodeId)
    NodeApi.getRoot().then((root) => {
        Logger.info('在路由中确定root节点为', root.title)
        useCurrentNodeStore().updateRoot(root)
    })

    if (nodeId > 0) {
        NodeApi.find(nodeId).then((node) => {
            Logger.info('在路由中确定current节点为', node.title)
            useCurrentNodeStore().update(node)
        })
    }
})

export default Router