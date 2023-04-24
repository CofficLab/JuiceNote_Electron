import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { computed, onMounted, onUnmounted, watch, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import Trash from "../icons/trash.vue";
import Preload from "../entities/Preload";

class EditorBox {
    public editor;
    public index;
    public constructor(editor, index) {
        this.editor = editor;
        this.index = index;
    }

    public getContent() {
        return monaco.editor.getModels()[this.index.toString()].getValue()
    }

    public getLanguage() {
        console.log("获取 monaco editor 的语言", this.editor.getModel()!.getLanguageId());

        return this.editor.getModel()!.getLanguageId();
    }

    public setContent(content) {
        console.log('设置monaco content', this.index)
        monaco.editor.getModels()[this.index.toString()].setValue(content);
    }

    public setLanguage(language) {
        console.log("设置Monaco Editor的Language为", language);

        if (this.editor == undefined) {
            return console.log("editor尚未实例化，不能设置language");
        }

        monaco.editor.setModelLanguage(this.editor.getModel()!, language);
    }

    public getHeight() {
        // 如果设置了高度，则固定高度
        // if (props.height > 0) {
        //     console.log("monaco editor 收到了props传递的高度", props.height);

        //     return props.height;
        // }

        let lineCount = this.editor.getModel()!.getLineCount();
        let lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        let padding = this.editor.getOption(monaco.editor.EditorOption.padding);
        return lineCount * lineHeight + padding.top + padding.bottom;
    }

    public onChanged(callback) {
        this.editor.getModel()!.onDidChangeContent(() => {
            console.log("monaco editor content changed");

            // 使用 this.editor.getValue() 会导致整个界面卡住
            // https://github.com/microsoft/monaco-editor/issues/2439
            let content = monaco.editor.getModels()[this.index.toString()].getValue();

            callback(content, this.editor);
        });

        return this;
    }

    public onLanguageChanged(callback) {
        this.editor.getModel()?.onDidChangeLanguage((e) => {
            console.log("monaco editor languaged changed", e);

            callback(e.newLanguage);
        });

        return this;
    }

    public onCreated(callback) {
        monaco.editor.onDidCreateEditor((editor) => callback(editor));

        return this;
    }
}

export default EditorBox