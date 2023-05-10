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
import Preload from "../api/Preload"
import Logger from "electron-log"

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
    let root = EmptyNode
    let current = EmptyNode
    let nodeSource = to.params.source?.toString()
    let nodeId = parseInt(to.params.id?.toString())

    Logger.info("从", from.fullPath, "到", to.fullPath)
    Logger.info('从路由中获取的节点ID为', nodeId)
    
    if (to.name == 'shop' || nodeSource == 'shop') {
        Logger.info('当前节点数据库为：shop')

        root = ShopApi.getRoot()
        current = root 
        if (nodeId > 0) {
            Preload.ipc.invoke('findShopNodeFirstPage', nodeId).then((node) => {
                current = node
                
                Logger.info('在路由中确定root节点为', root.title)
                Logger.info('在路由中确定current节点为', current.title)

                useCurrentNodeStore().updateRoot(root)
                useCurrentNodeStore().update(current)
            })
        }
    } else {
        Logger.info('当前节点数据库为：local')
        root = NodeApi.getRoot()
        current = nodeId > 0 ? NodeApi.find(nodeId) : root

        Logger.info('在路由中确定root节点为', root.title)
        Logger.info('在路由中确定当前节点为', current.title)

        if (!current.isPage) {
            current = current.getFirstPage()
            Logger.info('在路由中确定当前节点为', current.title)
        }

        useCurrentNodeStore().updateRoot(root)
        useCurrentNodeStore().update(current)
    }
})

export default Router