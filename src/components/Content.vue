<template>
  <div class="flex w-full flex-row pb-24">
    <div class="mx-auto mt-2 flex justify-center">
      <div id="viewer" v-show="extensionName == '.md'" class="w-full justify-center py-5 px-20"></div>

      <CurrentVuePage v-if="extensionName == '.vue'"></CurrentVuePage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@toast-ui/editor";
import chart from "@toast-ui/editor-plugin-chart";
import RouteController from "../controllers/RouteController";
import Render from "../tools/Render";
import { defineAsyncComponent } from "vue";
import { writeFileSync } from "fs";
import path from "path";

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

const currentVuePage = "./temp/Current.vue";

export default defineComponent({
  components: {
    CurrentVuePage: defineAsyncComponent(() => import("../../" + currentVuePage)),
  },
  data() {
    return {
      extensionName: ".md",
    };
  },
  computed: {
    current: () => RouteController.currentPage,
  },
  watch: {
    current() {
      this.show();
    },
  },
  mounted: function () {
    this.show();
  },
  methods: {
    show() {
      console.log("current is", this.current.id);
      this.extensionName = path.extname(this.current.path);
      if (this.extensionName == ".vue") {
        writeFileSync(currentVuePage, this.current.markdownSourceCode());
      }

      if (this.extensionName == ".md") {
        this.loadViewer();
      }
    },
    loadViewer: function () {
      Editor.factory({
        viewer: true,
        height: "h-full",
        el: document.querySelector("#viewer") ?? document.createElement("div"),
        initialValue: this.current.markdownSourceCode(),
        plugins: [[chart, chartOptions]],
        customHTMLRenderer: {
          heading: Render.heading,
          codeBlock: Render.codeBlock,
          text: Render.text,
        },
      });

      RouteController.renderedHtml = document.querySelector(".toastui-editor-contents")?.innerHTML ?? "";
      this.current.saveRendered(RouteController.renderedHtml);
    },
  },
});
</script>

<style lang="postcss">
#viewer .toastui-editor-contents {
  @apply prose w-full dark:prose-invert xl:prose-lg  !important;
}
</style>
