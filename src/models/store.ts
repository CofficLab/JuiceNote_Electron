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
        this.root = node.getRoot()

        return created
    },
    // updateNavigators(root: node) {
    // console.log('update navigators in store')
    // this.root = root
    // nav.update(root)
    // },
    updateOrder(navigator: node, order: number) {
        navigator.setOrder(order)
        this.root = node.getRoot()
    },
    /**
     * 更新单个导航
     * 
     * @param navigator 
     */
    updateNavigator(navigator: node) {
        console.log('update navigator in store', navigator.id)
        let key = node.getRoot().children.indexOf(navigator)
        console.log('key is ', key)
        this.root.children[key] = navigator

        navigator.update(this.root)
    },
    deleteNavigator(navigator: node) {
        navigator.delete()
        this.root = node.getRoot()
    },
    getActivated(path: string) {
        return this.root.getActivatedChildren(path);
    },
    current(path: string): node {
        return this.root.getLastActivated(path)
    }
})

export default store