<template>
  <div @click="rename">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">重命名</span>
  </div>
</template>

<script setup>
import ArrowLeftCircle from "../assets/icons/arrow-left-circle.svg";

import { useRouter } from "vue-router";
import { Node } from "../entities/Node";

const router = useRouter();
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
