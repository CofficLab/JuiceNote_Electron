<template>
  <div @click="add">
    <Plus v-if="showIcon"></Plus>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import Plus from "../../assets/icons/plus.svg";
import { Node } from "../../models/Node";

let route = useRoute();
let router = useRouter();
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
  router.push({
    path: "/lessons/" + props.node.id + "/edit",
    query: {
      adding: 1,
    },
  });
};
</script>
