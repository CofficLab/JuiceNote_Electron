<template>
  <div v-html="toc" class="w-full h-full mb-8"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import { nav } from "../models/nav";

export default defineComponent({
  computed: {
    toc(): string {
      return markdown.getMarkdownToc(nav.getMarkdownNameFromRoutePath(this.$route.path));
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
      @apply bg-gradient-to-r from-sky-600 to-sky-500 dark:from-neutral dark:to-neutral-focus
      shadow-xl px-4 py-1 text-sm -ml-4 hover:to-sky-400;
    }

    a {
      @apply no-underline z-0;
    }
  }

  /* 章节名称 */
  > ul > li {
    @apply shadow-2xl rounded-none px-4 py-1 text-lg ml-0;
  }
}
</style>
