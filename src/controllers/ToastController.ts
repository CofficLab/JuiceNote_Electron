import { reactive } from 'vue'

const ToastController = reactive({
    toast: '',

    set(message: string): void {
        this.toast = message
    },
})

export default ToastController