<template>
  <ul
    ref="menus"
    class="menu z-50 w-56 rounded-md bg-green-500/60 py-2 shadow-2xl ring-1 ring-gray-400"
    v-bind:style="{ left: x + 'px', top: y + 'px', position: 'fixed' }"
  >
    <slot></slot>
  </ul>
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
