import { defineStore } from 'pinia'
import storeLogger from '../log/storeLogger'

export const useEditorStore = defineStore('editor', {
    state: () => {
        return { editor: '' }
    },

    actions: {
        set(editor: string) {
            storeLogger.log('更新 editor 为', editor)
            this.editor = editor
        },
    },
})