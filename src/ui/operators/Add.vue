<template>
  <div @click="add">
    <IconCreate v-if="showIcon"></IconCreate>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script setup>
import Plus from "../icons/IconPlus.vue";
import { Node } from "../entities/Node";
import { useCurrentNodeStore } from "../stores/NodeStore";
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

const nodeStore = useCurrentNodeStore()
const router = useRouter()

let add = function () {
  props.node.createChild(new Node({
    title: "新页面",
    isPage:true,
    parentId: props.node.id,
  })).then((id) => {
    componentLogger.info('新节点的ID',id)
    nodeStore.updateRoot()
    router.push({
      name: "nodes.edit",
      params: {
        id: id,
      }
    })
  })
};
</script>
