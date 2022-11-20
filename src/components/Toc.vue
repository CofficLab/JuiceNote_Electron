<template>
  <div class="h-full w-full border border-l-2 border-gray-400/10">
    <div class="table-of-contents" v-html="toc"></div>
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
    @apply m-0 w-full !important;

    li {
      @apply m-0 p-2 text-sm w-full h-full hover:bg-sky-300/30 rounded;

      a {
        @apply no-underline z-0 h-full w-full;
      }
    }
  }
}
</style>
