<template>
  <div class="flex flex-row w-full gap-8 justify-center">
    <textarea v-model="source" id="editor-content" class="w-1/2 p-8 rounded-2xl overflow-scroll px-8 h-full"></textarea>

    <div
      ref="content"
      class="prose w-full 2xl:prose-xl 3xl:prose-xl rounded-2xl bg-cyan-800/10 p-8 h-screen"
      v-html="html"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import RouteController from "../controllers/RouteController";
import fs from "fs";
import path from "path";
import Config from "../entities/Config";
import Markdown from "../entities/Markdown";
import Content from "./Content.vue";

export default defineComponent({
  data() {
    return {
      source: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    html(): string {
      let dom = document.createElement("div");
      let scriptDom = document.createElement("script");

      dom.innerHTML = Markdown.render(this.source);
      scriptDom.innerHTML = fs.readFileSync(path.join(Config.markdownRootPath, "/footer.js")).toString();

      this.$nextTick(() => {
        this.$refs.content.append(scriptDom);
      });

      return dom.innerHTML;
    },
  },
  components: { Content },
});
</script>
