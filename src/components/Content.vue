<template>
  <div>
    <div id="viewer"></div>

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

export default defineComponent({
  computed: {
    html: function () {
      console.log("get content of", RouteController.currentPage.id);

      return "";
    },
    markdownSourceCode: function () {
      return RouteController.getCurrentPage().markdownSourceCode();
    },
  },
  watch: {
    markdownSourceCode: function () {
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
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
      });
      // this.loadMyJS();
    },
    loadMyJS: function () {
      let scriptDom = document.createElement("script");
      scriptDom.innerHTML = readFileSync(join(Config.markdownRootPath, "/footer.js")).toString();

      this.$refs.script.append(scriptDom);
    },
  },
});
</script>
