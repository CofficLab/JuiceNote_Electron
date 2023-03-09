import { Node, emptyNode } from '../models/Node'
import { reactive } from 'vue'

const NodeController = reactive({
    search: decodeURI(location.search),
    currentPage: new Node({}),
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    editable: (new URL(location.href)).searchParams.get('editable') == 'true',
    renderedHtml: '',
    adding: false,           // 用于判断是否显示添加的表单
    renamingNode: emptyNode, // 正在重命名的图书节点
    sideMenus: [emptyNode],

    getCurrentPage(): Node {
        // console.log('get current page')
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

    getRenamingNode(): Node {
        return this.renamingNode
    },

    setSideMenus() {
        this.sideMenus = this.getCurrentPage().getBook().getChildren()
    },

    setCurrentPage(id?: number) {
        id = id ?? parseInt((new URL(location.href)).searchParams.get('id') || '0')
        console.log('set current page to', id)

        this.currentPage = Node.find(id).getFirstPage()
        this.setSideMenus()
        this.updateUrl()
    },

    setRenamingNode(node: Node) {
        this.renamingNode = node
    },

    toggleEditable(): string {
        this.editable = !this.editable
        this.updateUrl()
        this.setCurrentPage()
        return this.editable ? '已开启编辑模式' : '已关闭编辑模式'
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

    updateTitle(node: Node, title: string): string {
        let result = node.updateTitle(title)
        this.setCurrentPage(this.getCurrentPage().id)

        return result
    },

    updateUrl() {
        history.pushState([], "", location.pathname + "?id=" + this.currentPage.id + '&editable=' + this.editable);
    },

    delete(target: Node): string {
        this.setCurrentPage(target.getParent().id)

        return target.delete()
    },
})

export default NodeController