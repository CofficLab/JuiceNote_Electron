import { reactive } from 'vue'
import { nav, navigatorNode } from './nav'

const store = reactive({
    full_screen: false,
    edit_mode: false,
    navigator: null,
    navigators: nav.getNavigators(),
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
    makeNavigator(name: string) {
        let node = nav.make(name)
        this.navigators = nav.getNavigators()

        return node
    },
    updateNavigators(navigators: navigatorNode) {
        // console.log('update navigators in store')
        this.navigators = navigators
        nav.update(navigators)
    },
    /**
     * 更新单个导航
     * 
     * @param navigator 
     */
    updateNavigator(navigator: navigatorNode) {
        console.log('update navigator in store', navigator.id)
        let key = nav.getNavigators().children.indexOf(navigator)
        console.log('key is ', key)
        this.navigators.children[key] = navigator

        nav.update(this.navigators)
    },
    deleteNavigator(navigator: navigatorNode) {
        navigator.delete()
        this.navigators = nav.getNavigators()
    },
    getActivatedNavigators(path: string) {
        let activatedOnes = nav.getNavigators().getActivatedChildren(path);
        let book = activatedOnes.shift();

        return book ? book.children : [];
    }
})

export default store