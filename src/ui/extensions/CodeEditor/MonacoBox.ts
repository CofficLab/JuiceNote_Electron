import { editor } from "monaco-editor";

export interface CreateEditorOptions {
    name?: string;
    target: HTMLDivElement;
    content: string;
    language: string;
    readOnly?: boolean;
    runnable?: boolean;
    showLineNumbers?: boolean;
    onCreated?: (editor: MonacoBox) => void;
    onContentChanged?: (editor: MonacoBox) => void;
    onRunnableChanged?: (value: boolean) => void;
    onLanguageChanged?: (editor: MonacoBox) => void;
}

class MonacoBox {
    public editor: editor.IStandaloneCodeEditor;
    public index;
    public runnable;
    public name;
    public runnableChangedCallback: Function;

    public constructor(editor: any, index: any, runnable = true,name="未命名Monaco编辑器") {
        this.editor = editor;
        this.index = index;
        this.runnable = runnable
        this.name = name
        this.runnableChangedCallback = () => { }

        this.onContentChanged((editorBox: MonacoBox) => {
            this.setHeight()
        });
    }

    public getContent() {
        // 使用 this.editor.getValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return window.monaco.editor.getModels()[this.index.toString()].getValue()
    }

    public getHeight() {
        return this.editor.getDomNode()!.style.height
    }

    // 所有的行合起来的高度
    public getLinesHeight() {
        let lineCount = this.editor.getModel()!.getLineCount();
        let lineHeight = this.editor.getOption(window.monaco.editor.EditorOption.lineHeight);
        let padding = this.editor.getOption(window.monaco.editor.EditorOption.padding);

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
        return window.monaco.editor.getModels()[this.index.toString()].setValue(content)
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

        window.monaco.editor.setModelLanguage(this.editor.getModel()!, language);
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

    static createEditor(box: MonacoBox, options: CreateEditorOptions) {
        console.log('激活Monaco，名字是',options.name)
        window.require(["vs/editor/editor.main"], () => {
            const editor = window.monaco.editor.create(options.target, {
                value: options.content,
                language: options.language,
                readOnly: options.readOnly,
                theme: "vs-dark",
                fontSize: 14,
                lineNumbers: options.showLineNumbers ? "on" : "off",
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
                    top: options.readOnly ? 10 : 10,
                    bottom: options.readOnly ? 10 : 50,
                },
                minimap: { enabled: false },
            });

            box = new MonacoBox(editor, window.monaco.editor.getModels().length - 1, options.runnable,options.name);

            if (options?.onCreated != undefined) {
                box.setHeight()
                options.onCreated(box)
            }
            if (options?.onContentChanged != undefined) box.onContentChanged(options.onContentChanged);
            if (options?.onLanguageChanged != undefined) box.onLanguageChanged(options.onLanguageChanged);
            if (options?.onRunnableChanged != undefined) box.onRunnableChanged(options.onRunnableChanged);
        });
    }
}

export default MonacoBox