import { reactive } from 'vue'
import node from './node'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    root: node.getRoot(),
    toast: '',
    href: location.href,
    search: decodeURI(location.search),
    pathname: location.pathname,
    current: node.getRoot().current(),
    isProd: location.protocol === 'file:',
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
    updateOrder(navigator: node, order: number): node {
        let newNode = navigator.setOrder(order)
        this.refresh()

        return newNode
    },
    refresh() {
        this.root = node.refreshedRoot()
    },
    delete(node: node) {
        node.delete()
        this.refresh()
    },
    goto(id: string) {
        if (id === '/') id = this.root.firstLeaf().id
        history.pushState([], "", location.pathname + "?id=" + id);
        this.href = window.location.href
        this.search = decodeURI(location.search)
        this.pathname = window.location.pathname
        this.current = this.root.current()
    }
})

export default store