import Node from '../models/Node'
import { reactive } from 'vue'
import BookNode from '../entities/BookNode'

const NodeController = reactive({
    search: decodeURI(location.search),
    currentPage: new BookNode,
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editable: (new URL(location.href)).searchParams.get('edit_mode') != undefined,
    renderedHtml: '',
    adding: false, // 用于判断是否显示添加的表单
    renamingBookNode: new BookNode, // 正在重命名的图书节点

    getCurrentPage(): Node {
        console.log('get current page')
        let id = parseInt((new URL(location.href)).searchParams.get('id') || '')
        if (id > 0) {
            return Node.find(id)
        }

        return Node.getFirstBook().getFirstPage()
    },
})

export default NodeController