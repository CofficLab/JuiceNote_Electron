import { defineStore } from 'pinia'
import storeLogger from '../log/storeLogger'
import { Editor } from "@tiptap/vue-3";

 const useEditorStore = defineStore('editor', {
    state: () => {
         return {
             editor:undefined,
         }
    },

    actions: {
        set(editor:Editor) {
            storeLogger.log('设置 editor')
            this.editor = editor
        },
    },
 })

 export default useEditorStore