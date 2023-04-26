import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

class MonacoBox {
    public editor: monaco.editor.IStandaloneCodeEditor;
    public index;
    public runnable;
    public runnableChangedCallback: Function;

    public constructor(editor: any, index: any, runnable = true) {
        MonacoBox.createWorker()

        this.editor = editor;
        this.index = index;
        this.runnable = runnable
        this.runnableChangedCallback = () => { }

        this.onCreated((editorBox: MonacoBox) => {
            this.setHeight()
        })
        this.onContentChanged((editorBox: MonacoBox) => {
            this.setHeight()
        });
    }

    public getContent() {
        // 使用 this.editor.getValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return monaco.editor.getModels()[this.index.toString()].getValue()
    }

    public getHeight() {
        return this.editor.getDomNode()!.style.height
    }

    // 所有的行合起来的高度
    public getLinesHeight() {
        let lineCount = this.editor.getModel()!.getLineCount();
        let lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        let padding = this.editor.getOption(monaco.editor.EditorOption.padding);

        return lineCount * lineHeight + padding.top + padding.bottom;
    }

    public getRunnable(): boolean {
        return this.runnable
    }

    public getLanguage() {
        // console.log("获取 monaco editor 的语言", this.editor.getModel()!.getLanguageId());

        return this.editor.getModel()!.getLanguageId();
    }

    public getParentDomNode(): HTMLElement | null | undefined {
        let domNode = this.editor.getDomNode()

        return domNode?.parentElement
    }

    public setContent(content: string) {
        // console.log('设置monaco content', content)

        if (content == this.getContent()) return

        // 使用 this.editor.setValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return monaco.editor.getModels()[this.index.toString()].setValue(content)
    }

    public setHeight() {
        let height = this.getLinesHeight();

        this.editor.getDomNode()!.style.height = height + "px";
    }

    public setLanguage(language: string) {
        if (this.editor == undefined) {
            return console.log("editor尚未实例化，不能设置language");
        }

        if (language == this.getLanguage()) {
            console.log('放弃设置monaco language，因为没有变化', language)

            return
        }

        console.log("设置Monaco Editor的Language为", language);

        monaco.editor.setModelLanguage(this.editor.getModel()!, language);
    }

    public toggleRunnable() {
        this.runnable = !this.runnable
        if (this.runnableChangedCallback) {
            this.runnableChangedCallback(this.runnable)
        }
    }

    public onContentChanged(callback: (arg0: any) => void) {
        this.editor.getModel()!.onDidChangeContent(() => { callback(this) });
        return this;
    }

    public onLanguageChanged(callback: (arg0: any) => void) {
        this.editor.getModel()?.onDidChangeLanguage(() => {
            console.log('monaco editor language changed, call the callback function', this.editor.getModel()?.getLanguageId());
            callback(this)
        });
        return this
    }

    public onRunnableChanged(callback: (arg0: any) => void): MonacoBox {
        this.runnableChangedCallback = callback

        return this
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

    static createEditor(props, target: HTMLDivElement, runnable: boolean) {
        let editor = monaco.editor.create(target, {
            value: props.content,
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

        return new MonacoBox(editor, monaco.editor.getModels().length - 1, runnable);
    }
}

export default MonacoBox