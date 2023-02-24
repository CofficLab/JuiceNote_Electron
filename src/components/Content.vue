<template>
  <div class="flex w-full flex-row">
    <div id="viewer" class="w-full"></div>
    <div class="hidden" ref="script"></div>

    <!-- 文章的右侧栏 -->
    <aside class="hidden min-h-screen w-56 justify-end xl:flex xl:flex-row">
      <div class="fixed right-0 flex h-screen w-56 flex-row justify-end">
        <TocContent :markdown="html"></TocContent>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Toc from "toc-maker";
import Editor from "@toast-ui/editor";
import TocContent from "../components/TocContent.vue";
import Config from "../entities/Config";
import { writeFile } from "fs";
import { join } from "path";

export default defineComponent({
  data() {
    return { html: "" };
  },
  computed: {
    sourceCode: function () {
      return RouteController.getCurrentPage().markdownSourceCode();
    },
  },
  watch: {
    sourceCode: function () {
      console.log("markdown source code changed");
      this.loadViewer();
    },
  },
  mounted: function () {
    this.loadViewer();
  },
  methods: {
    loadViewer: function () {
      let viewer = Editor.factory({
        viewer: true,
        el: document.querySelector("#viewer") ?? document.createElement("div"),
        initialValue: RouteController.getCurrentPage().markdownSourceCode(),
        plugins: [
          // colorSyntax,
          [codeSyntaxHighlight, { highlighter: Prism }],
          [
            chart,
            {
              minWidth: 100,
              maxWidth: 600,
              minHeight: 100,
              maxHeight: 300,
            },
          ],
        ],
      });
      window.loadMyJS();
      let p = new Toc(document.querySelector(".toastui-editor-contents"));
      this.html = p.tocEl.outerHTML;
      RouteController.getCurrentPage().saveRendered(document.querySelector(".toastui-editor-contents")?.innerHTML);
    },
  },
  components: { TocContent },
});
</script>
