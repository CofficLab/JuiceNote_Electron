<template>
  <div>
    <div ref="content" id="viewer" class=""></div>

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
import chart from "@toast-ui/editor-plugin-chart";
import Prism from "prismjs";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

export default defineComponent({
  data() {
    return {
      html: "",
    };
  },
  computed: {
    // html: function () {
    //   console.log("get content of", RouteController.currentPage.id);
    //   let dom = document.createElement("div");
    //   let scriptDom = document.createElement("script");
    //   dom.innerHTML = RouteController.getCurrentPage().html();
    //   scriptDom.innerHTML = readFileSync(join(Config.markdownRootPath, "/footer.js")).toString();
    //   this.$nextTick(() => {
    //     this.$refs.content.append(scriptDom);
    //   });
    //   return dom.innerHTML;
    // },
  },
  mounted: function () {
    this.loadViewer();
  },
  methods: {
    loadViewer: function () {
      const viewer = new Viewer({
        el: document.querySelector("#viewer"),
        // customHTMLRenderer: {},
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
