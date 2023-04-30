import * as monaco from "monaco-editor";
import MonacoBox from "./MonacoBox";


interface CreateEditorOptions {
    onCreate?: (editor: MonacoBox) => void;
    onContentChanged?: (editor: MonacoBox) => void;
    onRunnableChanged?: (value: boolean) => void;
    onLanguageChanged?: (editor: MonacoBox) => void;
}

class Jarvis {
    static createEditor(props, target: HTMLDivElement, runnable: boolean, options?: CreateEditorOptions) {
        require(["vs/editor/editor.main"], function () {
            const editor = monaco.editor.create(target, {
                value: props.content,
                language: props.language,
            });
        });

        // let editor = monaco.editor.create(target, {
        //     value: props.content,
        //     language: props.language,
        //     readOnly: props.readOnly,
        //     theme: "vs-dark",
        //     fontSize: 14,
        //     lineNumbers: props.showLineNumbers ? "on" : "off",
        //     automaticLayout: true,
        //     scrollBeyondLastLine: false,
        //     contextmenu: false,
        //     tabSize: 4,
        //     roundedSelection: false,
        //     renderLineHighlight: "none",
        //     formatOnPaste: true,
        //     scrollbar: {
        //         vertical: "hidden",
        //         horizontal: "hidden",
        //         alwaysConsumeMouseWheel: false,
        //     },
        //     overviewRulerBorder: false,
        //     overviewRulerLanes: 0,
        //     domReadOnly: false,
        //     stickyScroll: {
        //         enabled: false,
        //     },
        //     padding: {
        //         top: props.readOnly ? 10 : 10,
        //         bottom: props.readOnly ? 10 : 50,
        //     },
        //     minimap: { enabled: false },
        // });

        // let box = new MonacoBox(editor, monaco.editor.getModels().length - 1, runnable);

        // if (options?.onCreate != undefined) box.onCreated(options.onCreate);
        // if (options?.onContentChanged != undefined) box.onContentChanged(options.onContentChanged);
        // if (options?.onLanguageChanged != undefined) box.onLanguageChanged(options.onLanguageChanged);
        // if (options?.onRunnableChanged != undefined) box.onRunnableChanged(options.onRunnableChanged);

        // return box
    }
}


export default Jarvis