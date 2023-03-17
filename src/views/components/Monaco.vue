<template>
  <div>
    <div class="relative">
      <span v-html="language" class="absolute top-0 right-2 z-20 text-sm text-info"></span>
      <button
        contenteditable="false"
        class="btn-sm btn absolute bottom-2 right-2 z-20 bg-slate-900 shadow-sm"
        @click="run"
        v-if="showRunButton"
        v-html="result == '' ? '运行' : '收起'"
      ></button>

      <div ref="monaco" class="z-10"></div>
    </div>

    <!-- 展示运行结果 -->
    <pre
      v-show="result.length > 0"
      class="max-h-72 overflow-scroll"
      style="margin: 0; border-radius: 0"
    ><code v-html="result"></code></pre>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import CodeRunner from "../../tools/CodeRunner";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    code: { type: String, default: "" },
    language: { type: String, default: "" },
    readOnly: { type: Boolean, default: false },
    showRunButton: { type: Boolean, default: false },
    keyUpCallback: { type: Function, default: null },
    showLineNumbers: { type: Boolean, default: false },
  },
  data() {
    return {
      editor: null,
      index: 0, // 当前editor是整个页面的第几个editor，从0开始
      paddingTop: 10,
      paddingBottom: 10,
      result: "", //代码运行结果
    };
  },
  mounted: function () {
    this.setWorker();
    this.setEditor();
    this.resetHeight();
    this.setLanguage();
    this.index = monaco.editor.getModels().length - 1;
  },
  methods: {
    run() {
      if (this.result.length > 0) {
        this.result = "";
      } else {
        this.result = CodeRunner(monaco.editor.getModels()[this.index].getValue(), this.language);
      }
    },
    resetHeight() {
      let lineCount = this.editor.getModel().getLineCount();
      let lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
      let height = lineCount * lineHeight + this.paddingTop + this.paddingBottom;
      this.$refs.monaco.style.height = (this.readOnly ? height : height + 20) + "px";
    },
    setLanguage() {
      // console.log("设置Monaco Editor的Language为", this.language);
      monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
    },
    setWorker() {
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
    },
    setEditor() {
      this.editor = monaco.editor.create(this.$refs.monaco, {
        value: this.code,
        language: this.language,
        readOnly: this.readOnly,
        theme: "vs-dark",
        fontSize: 14,
        lineNumbers: this.showLineNumbers,
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
        domReadOnly: true,
        stickyScroll: {
          enabled: false,
        },
        padding: {
          top: this.paddingTop,
          bottom: this.paddingBottom,
        },
        minimap: { enabled: false },
      });

      this.editor.getModel().onDidChangeContent(() => {
        // 使用 this.editor.getValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        console.log("changed", monaco.editor.getModels()[this.index].getValue());
        this.keyUpCallback(monaco.editor.getModels()[this.index].getValue());
        this.resetHeight();
      });
    },
  },
  watch: {
    language() {
      this.setLanguage();
    },
  },
});
</script>
