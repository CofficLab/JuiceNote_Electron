import { Node, emptyNode } from '../models/Node'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const NodeController = reactive({
    search: decodeURI(location.search),
    currentPage: new Node({}),
    isProd: location.protocol === 'file:',
    isHomePage: (new URL(location.href)).searchParams.get('id') == '/',
    renderedHtml: '',
    adding: false,            // 用于判断是否显示添加的表单
    renamingNode: emptyNode,  // 正在重命名的图书节点
    createChildOf: emptyNode, // 正在添加子节点的节点
    sideMenus: [emptyNode],

    createChildPage(): Number {
        return this.getCurrentPage().createChildPage('子页面', '')
    },

    createChildChapter(): Number {
        return this.getCurrentPage().createChildChapter('子章节')
    },

    getCurrentPage(): Node {
        let id = useRoute().params.id
        console.log('get current page', id)

        return Node.find(id)
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

    getNodeById(id: number): Node {
        return Node.find(id)
    },

    setSideMenus() {
        this.sideMenus = this.getCurrentPage().getBook().getChildren()
    },

    setRenamingNode(node: Node) {
        this.renamingNode = node
    },

    setCreateChildOf(node: Node) {
        this.createChildOf = node
    },

    updateChildrenPriority(children: Node[]) {
        let parent = children.at(0)?.getParent()
        if (parent == undefined) {
            throw '更新children发生错误，找不到parent'
        }

        parent.setChildrenPriority(children)

        this.setSideMenus()
    },

    updateTitle(node: Node, title: string): string {
        let result = node.updateTitle(title)

        return result
    },

    updateContent(node: Node, content: string): string {
        let result = node.updateContent(content)

        return result
    },

    updateUrl() {
        history.pushState([], "", location.pathname + "?id=" + this.currentPage.id + '&editable=' + this.editable);
    },

    updateVisible(node: Node): string {
        let result = node.updateVisible()

        return result
    },

    transformToTab(node: Node): string {
        let result = node.transformToTab()

        return result
    },
})

export default NodeController