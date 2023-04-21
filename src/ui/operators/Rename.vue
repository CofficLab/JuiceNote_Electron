<template>
  <div @click="rename">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">重命名</span>
  </div>
</template>

<script setup>
import ArrowLeftCircle from "../assets/icons/arrow-left-circle.svg";
import { Node } from "../models/Node";
import { useRouter } from "vue-router";

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
  node: {
    type: Node,
    require: true,
  },
});

const rename = function () {
  dispatchEvent(new CustomEvent('show-rename-modal', {detail:{node:props.node}}))
};
</script>
