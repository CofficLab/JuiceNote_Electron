<template>
  <div @click="rename">
    <IconRename v-if="showIcon"></IconRename>
    <span v-if="showText">重命名</span>
  </div>
</template>

<script setup>
import IconRename from "../icons/IconRename.vue";
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
