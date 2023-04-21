import { reactive } from 'vue'

const FullScreenController = reactive({
    full: false,

    enter(): void {
        this.full = true
    },

    leave(): void {
        this.full = false
    },
})

export default FullScreenController