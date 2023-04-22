import { reactive } from 'vue'

const Error = reactive({
    error: '',

    set(message: string): void {
        this.error = message
    },

    append(message: string): void {
        this.error += message
    },

    clear(): void {
        this.error = ''
    }
})

export default Error