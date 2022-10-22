import { reactive } from 'vue'
import node from './node'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    root: node.getRoot(),
    toast: '',
    href: location.href,
    pathname: location.pathname,
    current: node.getRoot().current(),
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
    goto(link: string) {
        history.pushState([], "", link);
        this.href = window.location.href
        this.pathname = window.location.pathname
        this.current = this.root.current()
    }
})

export default store