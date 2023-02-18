import { reactive } from 'vue'

const FullScreenController = reactive({
    full_screen: false,

    enterFullScreen() {
        this.full_screen = true
    },
    leaveFullScreen() {
        this.full_screen = false
    },
})

export default FullScreenController