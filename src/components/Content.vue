<template>
  <div class="flex w-full flex-row pb-24">
    <!-- viewer的样式在最下面 -->
    <div class="mx-auto mt-2 flex justify-center">
      <div v-show="!editMode" id="viewer" class="w-full justify-center py-5 px-20"></div>
    </div>

    <div id="editor" v-show="editMode" class="container flex w-full justify-center"></div>

    <!-- 点击保存按钮时会读取这里的内容 -->
    <textarea class="hidden" id="editor-content" v-text="markdownSourceCode"></textarea>

    <div ref="iconSave"><InboxArrowDown></InboxArrowDown></div>
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
      const button = document.createElement("button");
      button.className = "toastui-editor-toolbar-icons last flex justify-center items-center";
      button.style.backgroundImage = "none";
      button.style.margin = "0";
      button.innerHTML = this.$refs.iconSave.innerHTML;
      button.addEventListener("click", () => {
        if (RouteController.getCurrentPage().markdownSourceCode() == editor.getMarkdown()) {
          ToastController.set("没有变化，无需保存");
        } else {
          RouteController.getCurrentPage().save(editor.getMarkdown());
          ToastController.set("已经保存");
        }
      });
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
        plugins: [colorPlugin, tableMergedCellPlugin, [chartPlugin, chartOptions]],
        customHTMLRenderer: {
          codeBlock: Render.codeBlock,
        },
        // toolbarItems: [],
        events: {
          load: function () {
            console.log("editor load");
          },
          change: onChange,
        },
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          // Using Option: Customize the last button
          [
            {
              el: button,
              tooltip: "保存",
            },
          ],
        ],
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
        plugins: [[chart, chartOptions]],
        customHTMLRenderer: {
          codeBlock: Render.codeBlock,
          text: Render.text,
        },
      });

      RouteController.renderedHtml = document.querySelector(".toastui-editor-contents")?.innerHTML ?? "";
      this.current.saveRendered(document.querySelector(".toastui-editor-contents")?.innerHTML);
    },
  },
});
</script>

<style lang="postcss">
#viewer .toastui-editor-contents {
  @apply prose w-full dark:prose-invert xl:prose-lg  !important;
}
</style>
