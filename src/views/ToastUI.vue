<template>
  <div class="z-0 flex h-screen w-full flex-grow flex-row gap-4 overflow-scroll pb-48">
    <main class="w-full">
      <div id="toastUI" class="h-screen w-full"></div>
    </main>

    <div class="hidden" ref="script"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "../components/Toc.vue";
import Editor from "@toast-ui/editor";
import RouteController from "../controllers/RouteController";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../entities/Config";

export default defineComponent({
  components: {
    Toc,
    Editor,
  },
  methods: {
    loadMyJS: function () {
      let scriptDom = document.createElement("script");
      scriptDom.innerHTML = readFileSync(join(Config.markdownRootPath, "/footer.js")).toString();

      this.$refs.script.append(scriptDom);
    },
  },
  mounted: function () {
    console.log("初始化编辑器");
    const editor = new Editor({
      el: document.querySelector("#toastUI"),
      height: "h-full",
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      initialValue: RouteController.getCurrentPage().markdownSourceCode(),
    });
    this.loadMyJS();
  },
});
</script>
