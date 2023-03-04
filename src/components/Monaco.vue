<template>
  <div>
    <div ref="monaco" class="h-full w-full"></div>
  </div>
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
  props: ["code", "keyUpCallback", "language"],
  mounted: function () {
    console.log("init monaco editor");
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
    let editor = monaco.editor.create(this.$refs.monaco, {
      value: this.code,
      language: this.language,
      readOnly: false,
      theme: "vs-dark",
      fontSize: 20,
      minimap: { enabled: false },
    });
    editor.onKeyUp(() => {
      this.keyUpCallback(editor.getValue());
      //   console.log("keyup", editor.getValue());
    });
  },
});
</script>
