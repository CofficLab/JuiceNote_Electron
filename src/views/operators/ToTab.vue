<template>
  <div @click="transform">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">转换成标签</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import { Node } from "../../models/Node";
import ToastController from "../../controllers/ToastController";
import NodeController from "../../controllers/NodeController";

export default defineComponent({
  props: {
    node: { type: Node, required: true },
    showText: { type: Boolean, default: true, required: false },
    showIcon: { type: Boolean, default: true, required: false },
  },
  components: { ArrowLeftCircle },
  methods: {
    transform() {
      return ToastController.set(NodeController.transformToTab(this.node));
    },
  },
});
</script>
