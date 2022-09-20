import { reactive } from 'vue'
import { navigatorNode, nav } from './nav'

const store = reactive({
    full_screen: false,
    sort_mode: false,
    edit_mode: false,
    navigators: nav.getNavigators(),
    enterFullScreen() {
        this.full_screen = true
    },
    leaveFullScreen() {
        this.full_screen = false
    },
    enterSortMode() {
        this.sort_mode = true
    },
    leaveSortMode() {
        this.sort_mode = false
    },
    enterEditMode() {
        this.edit_mode = true
    },
    leaveEditMode() {
        this.edit_mode = false
    },
    updateNavigators(navigators: navigatorNode[]) {
        // console.log('update navigators in store')
        this.navigators = navigators
        nav.update(navigators)
    }
})

export default store