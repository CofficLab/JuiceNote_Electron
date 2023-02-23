<template>
  <div class="flex flex-row flex-grow min-w-max mt-12 gap-4 overflow-hidden pb-48 h-screen">
    <!-- 编辑器 -->
    <div class="w-1/2 px-8">
      <textarea
        v-model="markdownSourceCode"
        id="editor-content"
        class="rounded-2xl overflow-scroll p-8 w-full h-full"
      ></textarea>
    </div>

    <!-- 文章内容 -->
    <div
      ref="content"
      class="prose w-1/2 2xl:prose-xl 3xl:prose-xl rounded-2xl bg-cyan-800/10 p-8 overflow-scroll"
      v-html="html"
    ></div>

    <!-- TOC -->
    <aside class="hidden xl:flex xl:flex-row justify-end w-56">
      <div class="flex flex-row justify-end w-56 fixed right-0">
        <Toc :markdownSourceCode="markdownSourceCode"></Toc>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import fs from "fs";
import path from "path";
import { defineComponent } from "vue";
import Toc from "../components/Toc.vue";
import RouteController from "../controllers/RouteController";
import Markdown from "../entities/Markdown";
import Config from "../entities/Config";

export default defineComponent({
  components: {
    Toc,
  },
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    html(): string {
      let dom = document.createElement("div");
      let scriptDom = document.createElement("script");

      dom.innerHTML = Markdown.renderWithoutToc(this.markdownSourceCode);
      scriptDom.innerHTML = fs.readFileSync(path.join(Config.markdownRootPath, "/footer.js")).toString();

      this.$nextTick(() => {
        this.$refs.content.append(scriptDom);
      });

      return dom.innerHTML;
    },
  },
});
</script>
