<template>
  <div ref="monaco"></div>
</template>

<script>
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["code", "keyUpCallback", "language", "readOnly"],
  data() {
    return {
      editor: null,
      editorOrder: 0,
      editors: [],
    };
  },
  mounted: function () {
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

    this.editor = monaco.editor.create(this.$refs.monaco, {
      value: this.code,
      language: this.language,
      readOnly: this.readOnly,
      theme: "vs-dark",
      fontSize: 14,
      lineNumbers: "off",
      automaticLayout: true,
      minimap: { enabled: false },
    });

    this.editors.push(this.editor);

    this.editorOrder = monaco.editor.getModels().length - 1;
    let model = monaco.editor.getModels()[this.editorOrder];
    this.editor.getModel().onDidChangeContent((e) => {
      // 使用 this.editor.getValue() 会导致整个界面卡住
      // https://github.com/microsoft/monaco-editor/issues/2439
      console.log("changed", model.getValue());
    });
  },
  watch: {
    language() {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
    },
    readOnly() {
      console.log("change readOnly option to", this.readOnly);
      monaco.editor.getModels()[0].dispose();
      monaco.editor.create(this.$refs.monaco, {
        value: this.code,
        language: this.language,
        readOnly: this.readOnly,
        theme: "vs-dark",
        fontSize: 14,
        lineNumbers: "off",
        automaticLayout: true,
        minimap: { enabled: false },
      });
    },
  },
});
</script>
