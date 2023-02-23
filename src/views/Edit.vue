<template>
  <div class="flex flex-row flex-grow gap-4 overflow-scroll pb-48 h-screen">
    <!-- 编辑器 -->
    <div class="w-1/2">
      <mavon-editor
        id="editor"
        v-model="markdownSourceCode"
        :externalLink="external_link"
        v-on:save="save"
        v-on:change="change"
        class="h-screen bg-red-800 rounded-2xl"
        :navigation="false"
        :toolbarsBackground="toolbarsBackground"
        :toolbarsFlag="true"
        :subfield="true"
        :defaultOpen="'edit'"
      />
    </div>

    <!-- 文章内容 -->
    <div
      ref="content"
      class="prose w-1/2 2xl:prose-xl 3xl:prose-xl rounded-2xl bg-cyan-800/10 p-8 overflow-scroll h-screen"
      v-html="html"
    ></div>

    <!-- TOC -->
    <aside class="hidden xl:flex xl:flex-row justify-end w-64">
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
import ToastController from "../controllers/ToastController";

export default defineComponent({
  components: {
    Toc,
  },
  data() {
    return {
      markdownSourceCode: RouteController.currentPage.markdownSourceCode(),
      html: "",
      toolbarsBackground: "#fbfbfb",

      external_link: {
        markdown_css: function () {
          return "/src/assets/github-markdown.min.css";
        },
        hljs_js: function () {
          return "/src/assets/hightlight.min.js";
        },
        katex_js: function () {
          return "/src/assets/katex.min.js";
        },
        katex_css: "/src/assets/katex.min.css",
        hljs_lang: function (lang: string) {
          return "https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/languages/" + lang + ".min.js";
        },
        hljs_css: function (css: string) {
          if (css) {
            return "https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/styles/" + css + ".min.css";
          }
          return "";
        },
      },
    };
  },
  watch: {
    current: function () {
      this.markdownSourceCode = RouteController.currentPage.markdownSourceCode();
    },
  },
  computed: {
    current: () => RouteController.currentPage,
  },
  methods: {
    change: function () {
      let dom = document.createElement("div");
      let scriptDom = document.createElement("script");
      dom.innerHTML = Markdown.renderWithoutToc(this.markdownSourceCode);
      scriptDom.innerHTML = fs.readFileSync(path.join(Config.markdownRootPath, "/footer.js")).toString();
      this.$nextTick(() => {
        this.$refs.content.append(scriptDom);
      });
      this.html = dom.innerHTML;
    },
    save: function () {
      if (RouteController.getCurrentPage().markdownSourceCode() != this.markdownSourceCode) {
        RouteController.getCurrentPage().save(this.markdownSourceCode);
        console.log("已保存");
      } else {
        ToastController.set("没有变化，无需保存文章");
      }
    },
  },
});
</script>
