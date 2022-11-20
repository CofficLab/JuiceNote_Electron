<template>
  <div v-html="toc" class="w-56 h-full mb-8"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    toc(): string {
      let current = store.current;
      return current.toc();
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
      @apply px-4 py-1 text-sm -ml-4;
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
