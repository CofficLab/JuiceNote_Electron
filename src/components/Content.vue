<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll pt-12 pb-24" id="content">
    <div class="prose"><div v-show="extensionName != '.vue'" v-html="html" class=""></div></div>

    <CurrentVuePage v-if="extensionName == '.vue'"></CurrentVuePage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import { defineAsyncComponent } from "vue";
import { writeFileSync } from "fs";
import path from "path";
import hljs from "highlight.js";

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
    html: () => RouteController.currentPage.markdownSourceCode(),
  },
  updated: function () {
    this.show();
  },
  watch: {
    html() {
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
      hljs.highlightAll();
      this.getOfficialLinks();
    },
    getOfficialLinks() {
      document.getElementById("official-link-button")?.classList.add("hidden");
      let box = document.getElementById("official-link-box");

      if (box == null) return;
      box.innerHTML = "";

      let dom = document.createElement("div");
      dom.innerHTML = this.html;
      let linkElements = dom.getElementsByTagName("official-link");
      for (let i = 0; i < linkElements.length; i++) {
        let linkElement = linkElements.item(i);
        let linkDom = document.createElement("li");
        linkDom.innerHTML = `
        <a href=${linkElement?.innerHTML} target=_blank>官方链接</a>
        `;
        box.append(linkDom);
      }

      if (linkElements.length > 0) {
        document.getElementById("official-link-button")?.classList.remove("hidden");
      }
    },
  },
});
</script>

<style lang="scss">
/* Basic editor styles */
#content {
  > * + * {
    margin-top: 0.75em;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
