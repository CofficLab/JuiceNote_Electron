import { createRouter, createWebHashHistory } from "vue-router"
import { useNodeStore } from "./stores/NodeStore"
import routerLogger from "./log/routerLogger"
import NodePage from "./pages/NodePage.vue"
import NotFound from './pages/NotFound.vue'
import About from './pages/About.vue'
import Setting from './pages/Setting.vue'
import NodeApi from "./api/NodeApi"
import ShopPage from "./pages/ShopPage.vue"
import { RootNode } from "./entities/Node"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/nodes/0/show'
        },
        {
            path: '/shop',
            name: 'shop',
            redirect: '/shop/0/show'
        },
        {
            path: '/setting',
            children: [
                {
                    path: '',
                    name: "setting",
                    redirect: '/setting/database'
                },
                {
                    path: 'database',
                    component: Setting,
                    name: "setting.database"
                },
            ]
        },
        {
            path: '/:pathMatch(.*)/:id',
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
    routerLogger.info("从", from.fullPath, "到", to.fullPath)
})

router.afterEach(function (to,from) {
    routerLogger.info('路由跳转完毕')

    if (to.name?.toString().startsWith('nodes')) {
        let nodeId = parseInt((to.params.id ? to.params.id : 0).toString())

        routerLogger.info('节点ID为', nodeId)

        if (nodeId > 0) {
            NodeApi.find(nodeId).then((node) => {
                routerLogger.info(`设置 store 中 current 为「${node.title}」`)
                useNodeStore().updateCurrent(node)
            })
        } else {
            NodeApi.getTree().then((tree) => {
                routerLogger.info(`设置 store 中 tree 为「${tree.title}」`)
                useNodeStore().updateRoot(tree)
                tree.getFirstChild().then((node) => {
                    routerLogger.info(`设置 store 中 current 为「${node.title}」`)
                    useNodeStore().updateCurrent(node)
                })
            })
        }
    }
})

export default router