import * as monaco from "monaco-editor";

class EditorBox {
    public editor: monaco.editor.IStandaloneCodeEditor;
    public index;

    public constructor(editor: any, index: any) {
        this.editor = editor;
        this.index = index;

        this.onCreated((editorBox: EditorBox) => {
            let height = editorBox.getLinesHeight();

            this.editor.getDomNode()!.style.height = height + "px";
        })
        this.onChanged((content, editorBox: EditorBox) => {
            editorBox.editor.getDomNode()!.style.height = editorBox.getLinesHeight() + "px";
        });
    }

    public getContent() {
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
        console.log("获取 monaco editor 的语言", this.editor.getModel()!.getLanguageId());

        return this.editor.getModel()!.getLanguageId();
    }

    public getParentDomNode(): HTMLElement | null | undefined {
        let domNode = this.editor.getDomNode()

        return domNode?.parentElement
    }

    public setContent(content: string | monaco.editor.ITextSnapshot) {
        console.log('设置monaco content', this.index)
        monaco.editor.getModels()[this.index.toString()].setValue(content);
    }

    public setLanguage(language: string) {
        console.log("设置Monaco Editor的Language为", language);

        if (this.editor == undefined) {
            return console.log("editor尚未实例化，不能设置language");
        }

        monaco.editor.setModelLanguage(this.editor.getModel()!, language);
    }

    public getHeight() {
        return this.editor.getDomNode()!.style.height
    }

    public onChanged(callback: (arg0: string, arg1: any) => void) {
        this.editor.getModel()!.onDidChangeContent(() => {
            console.log("monaco editor content changed");

            // 使用 this.editor.getValue() 会导致整个界面卡住
            // https://github.com/microsoft/monaco-editor/issues/2439
            let content = monaco.editor.getModels()[this.index.toString()].getValue();

            callback(content, this);
        });

        return this;
    }

    public onLanguageChanged(callback: (arg0: any) => void) {
        this.editor.getModel()?.onDidChangeLanguage((e: { newLanguage: any; }) => {
            console.log("monaco editor languaged changed", e);

            callback(e.newLanguage);
        });

        return this;
    }

    public onCreated(callback: Function) {
        monaco.editor.onDidCreateEditor(() => callback(this));

        return this;
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