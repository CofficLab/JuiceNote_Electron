import { reactive } from 'vue'

const ToastController = reactive({
    toast: '',

    set(message: string): void {
        this.toast = message

        setTimeout(() => {
            console.log("清理toast")
            this.toast = ""
        }, 3000)
    },
})

export default ToastController