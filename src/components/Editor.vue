<template>
  <div class="flex w-full flex-row pb-24">
    <div id="editor" class="container flex w-full justify-center"></div>
    <div id="icon-save" class="hidden"><InboxArrowDown></InboxArrowDown></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@toast-ui/editor";
import chart from "@toast-ui/editor-plugin-chart";
import chartPlugin from "@toast-ui/editor-plugin-chart";
import RouteController from "../controllers/RouteController";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCellPlugin from "@toast-ui/editor-plugin-table-merged-cell";
import Render from "../tools/Render";
import ToastController from "../controllers/ToastController";
import InboxArrowDown from "../icons/inbox-arrow-down.vue";

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};
const height = "h-full";

export default defineComponent({
  components: { InboxArrowDown },
  computed: {
    current: () => RouteController.currentPage,
  },
  watch: {
    current() {
      this.initEditor();
    },
  },
  mounted: function () {
    this.initEditor();
  },
  methods: {
    save(content: string) {
      ToastController.set(this.current.save(content));
    },
    change(renderedHtml: string) {
      RouteController.renderedHtml = renderedHtml;
    },
    initEditor: function () {
      const button = document.createElement("button");
      button.className = "toastui-editor-toolbar-icons last flex justify-center items-center";
      button.style.backgroundImage = "none";
      button.style.margin = "0";
      button.innerHTML = document.getElementById("icon-save")?.innerHTML ?? "";
      button.addEventListener("click", () => this.save(editor.getMarkdown()));

      let editor = new Editor({
        autofocus: true,
        el: document.querySelector("#editor") ?? document.createElement("div"),
        height: height,
        // initialEditType: "markdown",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        // previewStyle: "tab",
        language: "zh-cn",
        initialValue: this.current.markdownSourceCode(),
        // plugins: [colorPlugin, tableMergedCellPlugin, [chartPlugin, chartOptions]],
        // customHTMLRenderer: {
        //   // codeBlock: Render.codeBlock,
        // },
        events: {
          load: function () {
            console.log("editor load");
          },
          change: () => this.change(editor.getHTML()),
        },
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          [
            {
              name: "保存",
              el: button,
              tooltip: "保存",
            },
          ],
        ],
      });
    },
  },
});
</script>
