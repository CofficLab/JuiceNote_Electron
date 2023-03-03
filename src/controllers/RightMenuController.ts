import { reactive } from 'vue'

const RightMenuController = reactive({
    shouldShow: false,

    hide() {
        this.shouldShow = false
    },

    show() {
        this.shouldShow = true
    }
})

export default RightMenuController