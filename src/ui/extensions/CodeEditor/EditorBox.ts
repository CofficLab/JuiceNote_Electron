import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { computed, onMounted, onUnmounted, watch, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import Trash from "../icons/trash.vue";
import Preload from "../../entities/Preload";

class EditorBox {
    public editor: monaco.editor.IStandaloneCodeEditor;
    public index;

    public constructor(editor: any, index: any) {
        EditorBox.createWorker()

        this.editor = editor;
        this.index = index;

        this.onCreated((editorBox: EditorBox) => {
            let height = editorBox.getLinesHeight();

            this.editor.getDomNode()!.style.height = height + "px";
        })
        this.onChanged((editorBox: EditorBox) => {
            editorBox.editor.getDomNode()!.style.height = editorBox.getLinesHeight() + "px";
        });
    }

    public getContent() {
        // 使用 this.editor.getValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return monaco.editor.getModels()[this.index.toString()].getValue()
    }

    // 所有的行合起来的高度
    public getLinesHeight() {
        let lineCount = this.editor.getModel()!.getLineCount();
        let lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        let padding = this.editor.getOption(monaco.editor.EditorOption.padding);

        return lineCount * lineHeight + padding.top + padding.bottom;
    }

    public getLanguage() {
        // console.log("获取 monaco editor 的语言", this.editor.getModel()!.getLanguageId());

        return this.editor.getModel()!.getLanguageId();
    }

    public getParentDomNode(): HTMLElement | null | undefined {
        let domNode = this.editor.getDomNode()

        return domNode?.parentElement
    }

    public setContent(content: string | monaco.editor.ITextSnapshot) {
        // console.log('设置monaco content', this.index)

        if (content == this.getContent()) return

        monaco.editor.getModels()[this.index.toString()].setValue(content);
    }

    public setLanguage(language: string) {
        // console.log("设置Monaco Editor的Language为", language);

        if (this.editor == undefined) {
            return console.log("editor尚未实例化，不能设置language");
        }

        monaco.editor.setModelLanguage(this.editor.getModel()!, language);
    }

    public getHeight() {
        return this.editor.getDomNode()!.style.height
    }

    public onChanged(callback: (arg0: any) => void) {
        this.editor.getModel()!.onDidChangeContent(() => { callback(this) });
        this.editor.getModel()?.onDidChangeLanguage(() => { callback(this) });

        return this;
    }

    public onCreated(callback: Function) {
        monaco.editor.onDidCreateEditor(() => callback(this));

        return this;
    }


    static createWorker() {
        self.MonacoEnvironment = {
            getWorker(_, label) {
                if (label === "json") {
                    return new jsonWorker();
                }
                if (label === "css" || label === "scss" || label === "less") {
                    return new cssWorker();
                }
                if (label === "html" || label === "handlebars" || label === "razor") {
                    return new htmlWorker();
                }
                if (label === "typescript" || label === "javascript") {
                    return new tsWorker();
                }
                return new editorWorker();
            },
        };
    }

    static createEditor(props, target: HTMLDivElement) {
        let editor = monaco.editor.create(target, {
            value: props.code,
            language: props.language,
            readOnly: props.readOnly,
            theme: "vs-dark",
            fontSize: 14,
            lineNumbers: props.showLineNumbers ? "on" : "off",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            contextmenu: false,
            tabSize: 4,
            roundedSelection: false,
            renderLineHighlight: "none",
            formatOnPaste: true,
            scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                alwaysConsumeMouseWheel: false,
            },
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            domReadOnly: false,
            stickyScroll: {
                enabled: false,
            },
            padding: {
                top: 10,
                bottom: 50,
            },
            minimap: { enabled: false },
        });

        return new EditorBox(editor, monaco.editor.getModels().length - 1);
    }
}

export default EditorBox