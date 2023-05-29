<template>
  <div @click="add">
    <IconCreate v-if="showIcon"></IconCreate>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import { Node } from "../entities/Node";
import { useNodeStore } from "../stores/NodeStore";
import componentLogger from "../log/componentLogger";
import { useRouter } from "vue-router";
import IconCreate from "../icons/IconCreate.vue";

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

const nodeStore = useNodeStore()
const router = useRouter()

let add = function () {
  componentLogger.info('创建新页面，当前节点是',props.node.title)
  props.node.createChild(new Node({
    title: "新页面",
    isPage:true,
    parentId: props.node.id,
  })).then((id) => {
    componentLogger.info('新节点的ID',id)
    nodeStore.refreshRoot()
    router.push({
      name: "nodes.edit",
      params: {
        id: id,
      }
    })
  })
};
</script>
