<template>
  <div class="flex w-full flex-row pb-24">
    <div class="mx-auto mt-2 flex justify-center">
      <div id="viewer" class="w-full justify-center py-5 px-20"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@toast-ui/editor";
import chart from "@toast-ui/editor-plugin-chart";
import RouteController from "../controllers/RouteController";
import Render from "../tools/Render";

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

export default defineComponent({
  computed: {
    current: () => RouteController.currentPage,
  },
  watch: {
    current() {
      this.loadViewer();
    },
  },
  mounted: function () {
    this.loadViewer();
  },
  methods: {
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
