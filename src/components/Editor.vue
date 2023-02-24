<template>
  <div class="z-0 flex h-screen w-full flex-grow flex-row gap-4 overflow-scroll pb-16">
    <main class="w-full">
      <div id="editor" class="h-full w-full"></div>
    </main>

    <textarea class="hidden" id="editor-content" v-text="markdownSourceCode"></textarea>
    <div class="hidden" ref="script"></div>
  </div>
</template>

<script lang="ts">
import Editor from "@toast-ui/editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Prism from "prismjs";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCellPlugin from "@toast-ui/editor-plugin-table-merged-cell";
import chartPlugin from "@toast-ui/editor-plugin-chart";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";

export default defineComponent({
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  mounted: function () {
    console.log("初始化编辑器");
    this.initEditor();
  },
  computed: {
    current() {
      return RouteController.getCurrentPage();
    },
  },
  watch: {
    current: function () {
      this.initEditor();
    },
  },
  methods: {
    initEditor: function () {
      let editor = new Editor({
        autofocus: true,
        el: document.querySelector("#editor"),
        height: "h-full",
        // initialEditType: "markdown",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        // previewStyle: "tab",
        language: "zh-cn",
        initialValue: RouteController.getCurrentPage().markdownSourceCode(),
        plugins: [
          [codeSyntaxHighlightPlugin, { highlighter: Prism }],
          colorPlugin,
          tableMergedCellPlugin,
          [
            chartPlugin,
            {
              minWidth: 100,
              maxWidth: 600,
              minHeight: 100,
              maxHeight: 300,
            },
          ],
        ],
        // toolbarItems: [],
        events: {
          load: function () {
            console.log("editor load");
          },
          change: onChange,
        },
      });
      function onChange() {
        let content = document.getElementById("editor-content");
        if (content != undefined) {
          (content as HTMLInputElement).value = editor.getMarkdown();
        }
      }
      // window.loadMyJS();
    },
  },
});
</script>
