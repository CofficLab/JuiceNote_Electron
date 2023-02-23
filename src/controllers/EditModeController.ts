import { reactive } from 'vue'

const EditModeController = reactive({
    edit_mode: false,

    toggle(): void {
        this.edit_mode = !this.edit_mode
    }
})

export default EditModeController