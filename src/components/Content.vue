<template>
  <div class="flex w-full flex-row pb-24">
    <!-- viewer的样式在最下面 -->
    <div class="mx-auto mt-2 flex justify-center">
      <div v-show="!editMode" id="viewer" class="w-full justify-center py-5 px-20"></div>
    </div>

    <div id="editor" v-show="editMode" class="container flex w-full justify-center"></div>

    <!-- 点击保存按钮时会读取这里的内容 -->
    <textarea class="hidden" id="editor-content" v-text="markdownSourceCode"></textarea>
  </div>
</template>

<script lang="ts">
import Prism from "prismjs";
import { defineComponent } from "vue";
import Editor from "@toast-ui/editor";
import chart from "@toast-ui/editor-plugin-chart";
import TocContent from "../components/TocContent.vue";
import chartPlugin from "@toast-ui/editor-plugin-chart";
import RouteController from "../controllers/RouteController";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCellPlugin from "@toast-ui/editor-plugin-table-merged-cell";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};
const plugins = [
  // colorSyntax,
  [codeSyntaxHighlight, { highlighter: Prism }],
  [chart, chartOptions],
];
const height = "h-full";

export default defineComponent({
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    current: () => RouteController.currentPage,
    editMode: () => RouteController.editMode,
  },
  watch: {
    current() {
      this.loadViewer();
      this.initEditor();
    },
  },
  mounted: function () {
    this.loadViewer();
    this.initEditor();
  },
  methods: {
    initEditor: function () {
      let editor = new Editor({
        autofocus: true,
        el: document.querySelector("#editor") ?? document.createElement("div"),
        height: height,
        // initialEditType: "markdown",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        // previewStyle: "tab",
        language: "zh-cn",
        initialValue: RouteController.getCurrentPage().markdownSourceCode(),
        plugins: [
          [codeSyntaxHighlight, { highlighter: Prism }],
          colorPlugin,
          tableMergedCellPlugin,
          [chartPlugin, chartOptions],
        ],
        customHTMLRenderer: window.customHTMLRenderer,
        // toolbarItems: [],
        events: {
          load: function () {
            console.log("editor load");
          },
          change: onChange,
        },
      });
      function onChange() {
        // 写入textarea供保存按钮调取
        let content = document.getElementById("editor-content");
        if (content != undefined) {
          (content as HTMLInputElement).value = editor.getMarkdown();
        }
      }
    },
    loadViewer: function () {
      Editor.factory({
        viewer: true,
        height: height,
        el: document.querySelector("#viewer") ?? document.createElement("div"),
        initialValue: RouteController.getCurrentPage().markdownSourceCode(),
        plugins: [
          // colorSyntax,
          [codeSyntaxHighlight, { highlighter: Prism }],
          [chart, chartOptions],
        ],
        customHTMLRenderer: window.customHTMLRenderer,
      });

      RouteController.renderedHtml = document.querySelector(".toastui-editor-contents")?.innerHTML ?? "";
      this.current.saveRendered(document.querySelector(".toastui-editor-contents")?.innerHTML);
    },
  },
  components: { TocContent },
});
</script>

<style lang="postcss">
#viewer .toastui-editor-contents {
  /* @apply prose w-full dark:prose-invert xl:prose-lg  !important; */
}
</style>
