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
        nav.make(name)
        this.navigators = nav.getNavigators()
    },
    updateNavigators(navigators: navigatorNode[]) {
        // console.log('update navigators in store')
        this.navigators = navigators
        nav.update(navigators)
    },
    getActivatedNavigators(path: string) {
        let activatedOnes = nav.getActivatedOnes(path);
        let book = activatedOnes.shift();

        return book ? book.children : [];
    }
})

export default store