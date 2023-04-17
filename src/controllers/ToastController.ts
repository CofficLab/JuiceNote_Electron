import { reactive } from 'vue'

function truncate(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...'
    }
    return str
}

const ToastController = reactive({
    toast: '',

    set(message: string): void {
        this.toast = truncate(message, 20)

        setTimeout(() => {
            console.log("清理toast")
            this.toast = ""
        }, 3000)
    },
})

export default ToastController