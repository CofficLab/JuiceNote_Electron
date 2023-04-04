<template>
  <div @click="add">
    <Plus v-if="showIcon"></Plus>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Plus from "../../assets/icons/plus.svg";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";

let route = useRoute();
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
  // console.log("显示添加的弹层，父节点设置为", this.node);
  NodeController.setCreateChildOf(this.node);
  NodeController.adding = true;
};
</script>
