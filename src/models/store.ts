import { reactive } from 'vue'
import node from './node'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    navigator: null,
    root: node.getRoot(),
    enterFullScreen() {
        this.full_screen = true
    },
    leaveFullScreen() {
        this.full_screen = false
    },
    enterEditMode() {
        this.edit_mode = true
    },
    leaveEditMode() {
        this.edit_mode = false
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
    updateOrder(navigator: node, order: number) {
        navigator.setOrder(order)
        this.refresh()
    },
    refresh() {
        this.root = node.refreshedRoot()
        // console.log('refreshed root node in store', this.root)
    },
    getActivated(path: string) {
        return this.root.getActivatedChildren(path);
    },
    current(path: string): node {
        return this.root.getLastActivated(path)
    },
    delete(id: string) {
        this.root.delete(id)
        this.refresh()
    }
})

export default store