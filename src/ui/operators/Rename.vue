<template>
  <div @click="rename">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">重命名</span>
  </div>
</template>

<script setup>
import ArrowLeftCircle from "../icons/IconPrev.vue";
import { Node } from "../entities/Node";

const props = defineProps({
  showText: {
    type: Boolean,
    default: true,
    required: false,
  },
  showIcon: {
    type: Boolean,
    default: true,
    required: false,
  },
  node: Node,
});

const rename = function () {
  dispatchEvent(new CustomEvent("show-rename-modal", { detail: { node: props.node } }));
};
</script>
