<template>
  <mavon-editor
    id="editor"
    v-model="html"
    :externalLink="external_link"
    v-on:save="save"
    class="h-screen bg-red-800 rounded-2xl"
    :navigation="true"
    :toolbarsBackground="toolbarsBackground"
    :toolbarsFlag="true"
  />
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import store from "../models/store";

export default defineComponent({
  props: ["path"],
  data() {
    console.log("editor said:current path is", unescape(this.$route.path));
    return {
      toolbarsBackground: "#fbfbfb",
      html: markdown.getMarkdownContent(store.current(unescape(this.$route.path)).id),
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
  methods: {
    save: function () {
      if (markdown.getMarkdownContent(this.path) != this.html) {
        console.log("保存文章");
        // console.log("current node is", store.current(this.$route.path));
        markdown.writeToMarkdownFile(store.current(unescape(this.$route.path)).id, this.html);
      } else {
        console.log("没有变化，不保存文章");
      }
    },
  },
  mounted: function () {
    store.enterEditMode();
  },
});
</script>

<style lang="postcss">
#editor {
  @apply border-orange-400 border-t-8 pt-0 bg-green-900 z-10 rounded-2xl !important;

  /* 工具栏 */
  /* .v-note-op {
    @apply -mt-12 bg-base-200 border-base-100 text-base-content fixed shadow-2xl shadow-base-300 z-20 !important;

    .op-icon-divider {
      @apply border-l-base-content !important;
    }

    .v-right-item button {
      @apply mx-2;
    }

    .op-icon.selected {
      @apply bg-base-100;
    }
  } */

  /* 编辑展示区域 */
  .v-note-panel {
    @apply mt-0 z-10 bg-green-900 !important;

    .v-note-edit {
      @apply border-r-green-900 border-none !important;
    }

    .auto-textarea-wrapper .auto-textarea-input {
      @apply text-base-content;
    }

    textarea {
      @apply bg-base-100;
    }

    .content-input-wrapper {
      @apply bg-base-100 !important;
    }
  }

  /* 展示区域 */
  .v-show-content {
    @apply bg-base-100 text-base-content !important;
  }

  /* 标题导航 */
  .v-note-navigation-wrapper {
    @apply bg-transparent border-0 text-base-content fixed left-0 bottom-24 top-20 z-20   w-56 !important;

    .v-note-navigation-title {
      @apply hidden;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply w-48 my-2  no-underline bg-gradient-to-r from-base-300 to-base-200  shadow-xl px-4 py-1 text-sm ml-1 hover:to-sky-300 text-black;
    }

    h1 {
      @apply rounded-r-none text-lg;
    }
    h2 {
      @apply pl-8;
    }

    h3 {
      @apply pl-10;
    }
  }
}
</style>
