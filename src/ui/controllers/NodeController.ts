import { Node, emptyNode } from '../../models/Node'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const NodeController = reactive({
    isProd: location.protocol === 'file:',
    adding: false,            // 用于判断是否显示添加的表单
    renamingNode: emptyNode,  // 正在重命名的图书节点
    createChildOf: emptyNode, // 正在添加子节点的节点
    books: [emptyNode],
    visibleBooks: [emptyNode],

    getRenamingNode(): Node {
        return this.renamingNode
    },

    getNodeById(id: number): Node {
        return Node.find(id)
    },

    getBooks(): Node[] {
        console.log('获取图书列表')
        this.setBooks()
        return this.books
    },

    getVisibleBooks(): Node[] {
        return Node.getVisibleBooks()
    },

    setBooks() {
        this.books = Node.getBooks()
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
        dispatchEvent(new Event('nodeUpdated'))
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
        this.setBooks()
        dispatchEvent(new Event('nodeUpdated'))

        return result
    },

    transformToTab(node: Node): string {
        let result = node.transformToTab()

        return result
    },
})

export default NodeController