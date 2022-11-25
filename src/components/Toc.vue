<template>
  <div class="h-full overflow-scroll border border-l-2 border-gray-400/10 shadow">
    <div class="table-of-contents overflow-scroll" v-html="toc"></div>
  </div>
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
  @apply prose-sm w-full;

  ul {
    @apply w-full relative hover:bg-transparent !important;

    li {
      @apply m-2 text-sm w-full h-full rounded;

      a {
        @apply no-underline z-0 h-full w-full p-2 block hover:bg-sky-300/30;
      }
    }
  }
}
</style>
