import { reactive } from 'vue'
import node from './node'
import { unescape } from "querystring";

const store = reactive({
    full_screen: false,
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
    current(path: string): node {
        return this.root.current(unescape(path))
    },
    delete(node: node) {
        node.delete()
        this.refresh()
    }
})

export default store