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
  mounted: function () {
    // console.log("init monaco editor");
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

    // console.log("初始化Monaco，language=", this.language);
    let editor = monaco.editor.create(this.$refs.monaco, {
      value: this.code,
      language: this.language,
      readOnly: this.readOnly,
      theme: "vs-dark",
      fontSize: 18,
      lineNumbers: "off",
      automaticLayout: true,
      minimap: { enabled: false },
    });
    editor.onKeyUp(() => {
      this.keyUpCallback(editor.getValue());
    });
  },
});
</script>
