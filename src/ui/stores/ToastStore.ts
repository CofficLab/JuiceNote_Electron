import { defineStore } from 'pinia'

function truncate(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...'
    }
    return str
}

export const useToastStore = defineStore('message', {
    state: () => {
        return { message: '' }
    },

    actions: {
        set(message: string) {
            this.message = truncate(message, 20)

            setTimeout(() => {
                this.message = ''
            }, 2000);
        },
    },
})