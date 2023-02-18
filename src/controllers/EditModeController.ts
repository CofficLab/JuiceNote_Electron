import { reactive } from 'vue'

const EditModeController = reactive({
    edit_mode: false,

    setEditMode() {
        this.edit_mode = true
    },
    leaveEditMode() {
        this.edit_mode = false
    },
})

export default EditModeController