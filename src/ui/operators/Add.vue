<template>
  <div @click="add">
    <Plus v-if="showIcon"></Plus>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import Plus from "../assets/icons/plus.svg";
import Node from "../entities/Node";

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
    require: false,
  },
});

let add = function () {
  dispatchEvent(new CustomEvent('show-add-form',{detail:{node:props.node}}))
};
</script>
