<template>
  <div>
    <div class="relative">
      <span v-html="language" v-if="!editable" class="absolute right-0 top-0 z-20 rounded-bl-lg bg-cyan-800/20 px-2 py-1 text-sm text-info"></span>
      <button contenteditable="false" class="btn-sm btn absolute bottom-2 right-2 z-20 transition-none" :class="{ loading: running }" @click="run" v-html="runTitle" v-if="showRunButton"></button>

      <div ref="monaco" class="z-10"></div>
    </div>

    <!-- 展示运行结果 -->
    <div ref="result" v-show="resultEditorDisplay" class="border-2 border-transparent border-t-sky-900"></div>
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
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    code: { type: String, default: "" },
    height: 0, // 如果为0，则自动判断；如果大于0，则固定高度
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
      resultEditor: null,
      resultEditorIndex: 0,
      resultEditorDisplay: false,
      running: false,
    };
  },
  computed: {
    editable: () => useRoute().query.editable,
    runTitle() {
      if (this.running) return "运行中";
      if (this.resultEditorDisplay) return "收起";
      return "运行";
    },
  },
  mounted: function () {
    this.setWorker();
    this.setEditor();
    this.resetHeight();
    this.setLanguage();
    this.index = monaco.editor.getModels().length - 1;
    this.setResultEditor();
    this.resultEditorIndex = monaco.editor.getModels().length - 1;
  },
  methods: {
    run() {
      if (this.running) return;

      // 收起结果
      if (this.resultEditorDisplay) {
        this.resultEditorDisplay = false;
        this.running = false;
        return;
      }

      this.running = true;

      setTimeout(() => {
        let result = IpcRender.sendSync('run', monaco.editor.getModels()[this.index].getValue(), this.language);
        monaco.editor.getModels()[this.resultEditorIndex].setValue(result);
        this.$refs.result.style.height = this.getEditorHeight(this.resultEditor) + 10 + "px";
        this.running = false;
        this.resultEditorDisplay = true;
      }, 0);
    },
    resetHeight() {
      let height = this.getEditorHeight(this.editor);
      this.$refs.monaco.style.height = (this.readOnly ? height : height + 20) + "px";
    },
    getEditorHeight(editor) {
      // 如果设置了高度，则固定高度
      if (this.height > 0) return this.height

      let lineCount = editor.getModel().getLineCount();
      let lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
      return lineCount * lineHeight + this.paddingTop + this.paddingBottom;
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
        console.log("monaco editor content changed", monaco.editor.getModels()[this.index].getValue());
        this.keyUpCallback(monaco.editor.getModels()[this.index].getValue());
        this.resetHeight();
      });
    },
    // 用来展示运行结果的 Monaco Editor
    setResultEditor() {
      this.resultEditor = monaco.editor.create(this.$refs.result, {
        language: "shell",
        readOnly: true,
        fontSize: 14,
        lineNumbers: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        contextmenu: false,
        roundedSelection: false,
        renderLineHighlight: "none",
        scrollbar: { alwaysConsumeMouseWheel: false },
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        domReadOnly: true,
        padding: { top: this.paddingTop, bottom: this.paddingBottom },
        minimap: { enabled: false },
      });
    },
  },
  watch: {
    language() {
      this.setLanguage();
    },
    code() {
      console.log('更新monaco内容')
      monaco.editor.getModels()[this.index].setValue(this.code);
    },
  },

  beforeDestroy() {
    console.log("Monaco Editor before destroy");
  },

  destroyed() {
    console.log("Monaco Editor destroyed");
  },

  updated() {
    console.log("Monaco Editor updated");
  },
});
</script>
