<template>
  <VueDragResize
    :isActive="true"
    :w="1000"
    :h="800"
    v-on:resizing="resize"
    v-on:dragging="resize"
    class="flex bg-red-300 overflow-hidden p-8"
  >
    <slot></slot>
  </VueDragResize>
</template>

<script>
import VueDragResize from "vue-drag-resize/src";

export default {
  name: "app",

  components: {
    VueDragResize,
  },

  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },

  methods: {
    resize(newRect) {
      console.log("new width", newRect.width);
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
      console.log("resize");
    },
  },
};
</script>
