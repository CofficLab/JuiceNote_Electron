import NodePage from '../pages/NodePage.vue'
import { RouteRecordRaw } from 'vue-router'

const nodeRoutes: RouteRecordRaw =
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
}

export default nodeRoutes