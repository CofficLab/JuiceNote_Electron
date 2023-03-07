import Node from '../models/Node'
import { reactive } from 'vue'
import BookNode from '../entities/BookNode'
import ErrorController from './ErrorController'

const NodeController = reactive({
    search: decodeURI(location.search),
    currentPage: new Node({}),
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editable: (new URL(location.href)).searchParams.get('edit_mode') != undefined,
    renderedHtml: '',
    adding: false, // 用于判断是否显示添加的表单
    renamingBookNode: new BookNode, // 正在重命名的图书节点

    getCurrentPage(): Node {
        console.log('get current page')
        if (!this.currentPage.isEmpty) return this.currentPage

        this.setCurrentPage()
        return this.currentPage
    },

    setCurrentPage() {
        console.log('set current page')
        let id = parseInt((new URL(location.href)).searchParams.get('id') || '0')
        let result = new Node({})
        result = id > 0 ? Node.find(id) : Node.getFirstBook().getFirstPage()

        console.log('current page is', result)

        if (result.isEmpty) {
            ErrorController.set("获取到的当前页面是空节点<br/> id=" + id + "<br/> location.href=" + location.href)
        } else {
            ErrorController.clear()
        }

        this.currentPage = result
    },

    goto(id: number) {
        console.log('go to id', id)
        // if (this.isEditMode()) {
        //     history.pushState([], "", location.pathname + "?id=" + id + '&edit_mode=1');
        // } else {
        history.pushState([], "", location.pathname + "?id=" + id);
        // }

        // this.refresh()
        // this.checkHomePage()
        this.setCurrentPage()
    },
})

export default NodeController