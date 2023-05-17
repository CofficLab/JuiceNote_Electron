import { createRouter, createWebHashHistory } from "vue-router"
import NotFound from './pages/NotFound.vue'
import About from './pages/About.vue'
import Home from './pages/Home.vue'
import Database from './pages/Database.vue'
import { useCurrentNodeStore } from "./stores/NodeStore"
import NodeApi from "./api/NodeApi"
import NodePage from "./pages/NodePage.vue"
import routerLogger from "./log/routerLogger"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/nodes/:id',
            children: [
                {
                    path: 'edit',
                    component: NodePage,
                    name: "nodes.edit"
                },
                {
                    path: 'show',
                    component: NodePage,
                    name: "nodes.show"
                },
            ]
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
    ],
})

router.beforeEach(function (to, from) {
    /**
     * 路由发生变化时，更新store
     */
    let nodeId = parseInt(to.params.id?.toString())

    routerLogger.info("从", from.fullPath, "到", to.fullPath)
    routerLogger.info('节点ID为', nodeId)
 
    if (nodeId > 0) {
        routerLogger.info('开始异步获取节点信息')
        NodeApi.find(nodeId).then((node) => {
            routerLogger.info(`完成异步获取节点信息，设置 store 中 current 为「${node.title}」`)
            useCurrentNodeStore().update(node)
        })
    }
})

export default router