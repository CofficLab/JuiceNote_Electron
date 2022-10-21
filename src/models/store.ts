import { reactive } from 'vue'
import node from './node'
import { unescape } from "querystring";

const store = reactive({
    node: node,
    full_screen: false,
    navigator: null,
    root: node.getRoot(),
    toast: '',
    setToast(message: string) {
        this.toast = message
    },
    enterFullScreen() {
        this.full_screen = true
    },
    leaveFullScreen() {
        this.full_screen = false
    },
    getRoot() {
        console.log('get root navigator in store')
        if (this.root) return this.root
        return node.getRoot()
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
        // console.log('refreshed root node in store', this.root)
    },
    getActivated(path: string) {
        return this.root.getActivatedChildren(path);
    },
    current(path: string): node {
        return this.root.getLastActivated(unescape(path))
    },
    delete(id: string) {
        this.root.delete(id)
        this.refresh()
    }
})

export default store