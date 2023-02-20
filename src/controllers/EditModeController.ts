import { reactive } from 'vue'

const EditModeController = reactive({
    edit_mode: false,

    enter(): void {
        this.edit_mode = true
    },

    leave(): void {
        this.edit_mode = false
    },
})

export default EditModeController