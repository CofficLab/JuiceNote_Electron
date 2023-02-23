<template>
  <div class="flex flex-row flex-grow gap-4 overflow-scroll pb-48 h-screen z-0">
    <!-- 编辑器 -->
    <div class="w-full">
      <mavon-editor
        ref="editor"
        id="editor"
        :value="markdownSourceCode"
        v-model="markdownSourceCode"
        :externalLink="external_link"
        v-on:save="save"
        v-on:change="change"
        class="h-screen bg-red-800 rounded-2xl"
        :html="true"
        :navigation="false"
        :toolbarsBackground="toolbarsBackground"
        :toolbarsFlag="true"
      />
    </div>

    <div ref="script" class="hidden"></div>

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
import Config from "../entities/Config";
import ToastController from "../controllers/ToastController";

export default defineComponent({
  components: {
    Toc,
  },
  data() {
    return {
      markdownSourceCode: RouteController.currentPage.markdownSourceCode(),
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
      console.log("editor changed: 加载自定义JS");
      this.loadMyJS();
    },
    save: function () {
      if (RouteController.getCurrentPage().markdownSourceCode() != this.markdownSourceCode) {
        RouteController.getCurrentPage().save(this.markdownSourceCode);
        console.log("已保存");
      } else {
        ToastController.set("没有变化，无需保存文章");
      }
    },
    loadMyJS: function () {
      let scriptDom = document.createElement("script");
      scriptDom.innerHTML = fs.readFileSync(path.join(Config.markdownRootPath, "/footer.js")).toString();
      this.$nextTick(() => {
        this.$refs.script.append(scriptDom);
      });
    },
  },
  mounted: function () {
    // 渲染完成后加载自定义的JS代码，因为mavon editor没提供这个事件，所以用setTimeout
    // change函数是mavon editor的函数
    this.$refs.editor.$nextTick(function () {
      console.log("editor mounted: 触发change事件");
      setTimeout(() => this.change(), 400);
    });
  },
});
</script>
