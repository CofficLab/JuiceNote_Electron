import { reactive } from 'vue'
import { nav, navigatorNode } from './nav'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    navigator: null,
    root: nav.getRootNavigator(),
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
    getRootNavigator() {
        return nav.getRootNavigator()
    },
    makeNavigator(name: string) {
        let node = nav.make(name)
        this.root = nav.getRootNavigator()

        return node
    },
    updateNavigators(root: navigatorNode) {
        // console.log('update navigators in store')
        this.root = root
        nav.update(root)
    },
    updateOrder(navigator: navigatorNode, order: number) {
        navigator.setOrder(order)
        this.root = nav.getRootNavigator()
    },
    /**
     * 更新单个导航
     * 
     * @param navigator 
     */
    updateNavigator(navigator: navigatorNode) {
        console.log('update navigator in store', navigator.id)
        let key = nav.getRootNavigator().children.indexOf(navigator)
        console.log('key is ', key)
        this.root.children[key] = navigator

        nav.update(this.root)
    },
    deleteNavigator(navigator: navigatorNode) {
        navigator.delete()
        this.root = nav.getRootNavigator()
    },
    getActivatedNavigators(path: string) {
        return nav.getRootNavigator().getActivatedChildren(path);
    }
})

export default store