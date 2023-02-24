<template>
  <div class="w-full">
    <div id="viewer" class="w-full"></div>
    <div class="hidden" ref="script"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../entities/Config";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default defineComponent({
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
      new Viewer({
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
    },
  },
});
</script>
