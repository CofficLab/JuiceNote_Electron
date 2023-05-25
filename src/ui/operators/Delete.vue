<template>
  <div @click="deleteBookNode">
    <Trash class="h-6 w-6" v-if="showIcon"></Trash>
    <span v-if="showText">删除</span>
  </div>
</template>

<script setup lang="ts">
import Trash from "../icons/IconTrash.vue";

import { useRoute, useRouter } from "vue-router";
import { Node } from "../entities/Node";
import { useToastStore } from "../stores/ToastStore";
import { useNodeStore } from "../stores/NodeStore";

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
    required: true,
  },
});

const nodeStore = useNodeStore();
const deleteBookNode = async function () {
  let node = props.node
  router.push({
    name: "nodes.show",
    params: {
      id: (await node.getPrev()).id,
    }
  });
  node.delete().then(() => {
    nodeStore.refreshRoot()
    useToastStore().set(`已删除「${node.title}」`);
  })
};
</script>
