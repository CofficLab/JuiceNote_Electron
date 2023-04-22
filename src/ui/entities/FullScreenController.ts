import { reactive } from 'vue'

const FullScreen = reactive({
    full: false,

    enter(): void {
        this.full = true
    },

    leave(): void {
        this.full = false
    },
})

export default FullScreen