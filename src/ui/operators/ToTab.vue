<template>
  <div @click="transform">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">转换成标签</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../icons/IconPrev.vue";
import { Node } from "../entities/Node";

export default defineComponent({
  props: {
    node: { type: Node },
    showText: { type: Boolean, default: true, required: false },
    showIcon: { type: Boolean, default: true, required: false },
  },
  components: { ArrowLeftCircle },
  methods: {
    transform() {
      // return ToastController.set(NodeController.transformToTab(this.node));
    },
  },
});
</script>
