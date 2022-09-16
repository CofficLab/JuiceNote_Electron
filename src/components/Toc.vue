<template>
  <div v-html="toc" class="w-full h-full mb-8"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";

export default defineComponent({
  computed: {
    path: function () {
      return this.$route.path.replace("/article", "");
    },
    toc(): string {
      return markdown.getMarkdownToc(this.path);
    },
  },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-none mx-auto prose z-10 w-full fixed mb-8;

  ul {
    @apply z-10 w-auto ml-0 pl-0 !important;

    li {
      @apply bg-gradient-to-r from-sky-600 to-sky-500 shadow-xl rounded-r-2xl px-4 py-1 text-sm -ml-4 hover:to-sky-400;
    }

    a {
      @apply no-underline z-0;
    }
  }

  /* 章节名称 */
  > ul > li {
    @apply bg-gradient-to-r from-sky-600 to-sky-400 shadow-2xl rounded-none px-4 py-1 text-lg ml-0;
  }
}
</style>
