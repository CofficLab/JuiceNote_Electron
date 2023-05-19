import { createRouter, createWebHashHistory } from "vue-router"
import { useCurrentNodeStore } from "./stores/NodeStore"
import routerLogger from "./log/routerLogger"
import NodePage from "./pages/NodePage.vue"
import NotFound from './pages/NotFound.vue'
import About from './pages/About.vue'
import NodeApi from "./api/NodeApi"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/nodes/0/show'
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
    let nodeId = parseInt((to.params.id ? to.params.id : 0).toString())

    routerLogger.info("从", from.fullPath, "到", to.fullPath)
    routerLogger.info('节点ID为', nodeId)

    routerLogger.info('开始异步获取节点信息')
    let current = (nodeId > 0 ? NodeApi.find(nodeId) : NodeApi.getRoot())
    current.then((node) => {
        routerLogger.info(`完成异步获取节点信息，设置 store 中 current 为「${node.title}」`)
        useCurrentNodeStore().update(node)
    })
})

export default router