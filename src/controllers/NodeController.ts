import { Node, emptyNode } from '../models/Node'
import { reactive } from 'vue'

const NodeController = reactive({
    search: decodeURI(location.search),
    currentPage: new Node({}),
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editable: (new URL(location.href)).searchParams.get('edit_mode') != undefined,
    renderedHtml: '',
    adding: false, // 用于判断是否显示添加的表单
    renamingBookNode: new Node({}), // 正在重命名的图书节点
    sideMenus: [new Node({})],

    getCurrentPage(): Node {
        console.log('get current page')
        if (!this.currentPage.isEmpty) return this.currentPage

        this.setCurrentPage()
        return this.currentPage
    },

    getEditable(): boolean {
        return this.editable
    },

    getBreadcrumbs(): Node[] {
        return this.getCurrentPage().getParents().concat([this.getCurrentPage()])
    },

    getSideMenus(): Node[] {
        if (this.sideMenus.filter(menu => { return !menu.isEmpty }).length == 0) {
            this.setSideMenus()
        }

        return this.sideMenus
    },

    setSideMenus() {
        this.sideMenus = this.getCurrentPage().getBook().getChildren()
    },

    setCurrentPage(id?: number) {
        id = id ?? parseInt((new URL(location.href)).searchParams.get('id') || '0')
        console.log('set current page to', id)

        // 把ID记录到URL中，刷新后页面不会变化
        history.pushState([], "", location.pathname + "?id=" + id);
        this.currentPage = Node.find(id).getFirstPage()
    },

    toggleEditable() {
        this.editable = !this.editable
        history.pushState([], "", location.pathname + "?id=" + this.getCurrentPage().id + '&editable=' + this.editable);
    },

    updateChildrenPriority(children: Node[]) {
        let parent = children.at(0)?.getParent()
        if (parent == undefined) {
            throw '更新children发生错误，找不到parent'
        }

        parent.setChildrenPriority(children)

        this.setSideMenus()
        this.setCurrentPage(this.currentPage.id)
    },

    delete(target: Node): string {
        this.setCurrentPage(target.getParent().id)

        return target.delete()
    },
})

export default NodeController