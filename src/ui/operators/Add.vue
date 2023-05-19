<template>
  <div @click="add">
    <Plus v-if="showIcon"></Plus>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import Plus from "../icons/IconPlus.vue";
import { Node } from "../entities/Node";

let props = defineProps({
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

let add = function () {
  props.node.createChild(new Node({
    title: "新页面",
    parentId: props.node.id,
  }))
  // dispatchEvent(new CustomEvent("show-add-form", { detail: { node: props.node } }));
};
</script>
