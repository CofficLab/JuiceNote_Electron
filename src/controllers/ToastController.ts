import { reactive } from 'vue'

const ToastController = reactive({
    toast: '',

    setToast(message: string) {
        this.toast = message
    },
})

export default ToastController