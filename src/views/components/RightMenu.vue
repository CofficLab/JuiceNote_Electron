<template>
  <div ref="menus" class="right-menus" v-bind:style="{ left: x + 'px', top: y + 'px' }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["event"],
  data() {
    return {
      x: this.event.x,
      y: this.event.y,
    };
  },
});
</script>

<style lang="postcss">
.right-menus {
  @apply fixed z-50 w-56 rounded-md bg-base-300 shadow-2xl ring-1 ring-gray-300/30 !important;

  svg {
    @apply mr-4 inline-block h-6 !important;
  }
  div {
    @apply flex h-10 items-center justify-start justify-items-center p-4 text-yellow-900 hover:cursor-pointer hover:bg-base-200 !important;
  }
}
</style>
