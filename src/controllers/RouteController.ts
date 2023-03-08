import { emptyNode } from '../models/Node'
import { reactive } from 'vue'

const RouteController = reactive({
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    renderedHtml: '',
    adding: false, // 用于判断是否显示添加的表单
    renamingBookNode: emptyNode, // 正在重命名的图书节点

    checkHomePage() {
        this.isHomePage = (new URL(location.href)).searchParams.get('id') == '/'
    },
})

export default RouteController