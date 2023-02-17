import { reactive } from 'vue'
import node from './node'
import log from './log'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    root: new node,
    toast: '',
    href: location.href,
    search: decodeURI(location.search),
    pathname: location.pathname,
    current: new node,
    isProd: location.protocol === 'file:',
    codeId: '',
    code: '',
    project: (new node).project,

    setEditMode() {
        this.edit_mode = true
    },
    leaveEditMode() {
        this.edit_mode = false
    },
    setToast(message: string) {
        this.toast = message
    },
    enterFullScreen() {
        this.full_screen = true
    },
    leaveFullScreen() {
        this.full_screen = false
    },
    createChild(parent: node, name: string): node {
        let created = parent.create(name)
        this.refresh()

        return created
    },
    createFolderChild(parent: node, name: string): node {
        let created = parent.createFolder(name)
        this.refresh()

        return created
    },
    updateOrder(navigator: node, order: number) {
        log.info('store.updateOrder', navigator.id + '移动到' + order)
        navigator.setOrder(order)
        this.refresh()
    },
    refresh() {
        log.info('store.refresh', 'refresh in store')
        this.root = node.refreshedRoot()
        this.project = this.root.current().isLeaf() ? this.root.current().parent().project : this.root.current().firstLeaf().parent().project
    },
    delete(node: node) {
        this.goto(node.prevLeaf().id);
        node.delete()
        this.refresh()
    },
    goto(id: string) {
        if (id === '/') id = this.root.firstLeaf().id
        history.pushState([], "", location.pathname + "?id=" + id);
        this.href = window.location.href
        this.search = decodeURI(location.search)
        this.pathname = window.location.pathname
        log.info('store.goto', 'get current node')
        this.current = this.getCurrentNode(true)

        // 如果不是叶子且有子节点，跳到第一个子节点
        if (!this.current.isLeaf() && this.current.children.length > 0) {
            this.goto(this.current.first().id)
        }
    },
    getCurrentNode(refresh: boolean = false) {
        log.info('store.getCurrentNode', 'should refresh: ' + refresh.toString())

        if (this.current.notEmpty() && !refresh) {
            return this.current
        }

        let current = node.getRoot().current()
        this.current = current.isLeaf() ? current : current.firstLeaf()

        return this.current
    },
    getProject() {
        console.log('store.getProject', 'get current node')
        let current = this.getCurrentNode()
        current.isLeaf() ? current.parent().project : current.firstLeaf().parent().project
    },
    getRoot() {
        if (this.root.notEmpty()) {
            return this.root
        }

        return node.getRoot()
    }
})

export default store