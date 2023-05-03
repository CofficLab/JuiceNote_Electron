<template>
  <div @click="deleteBookNode">
    <Trash class="h-6 w-6" v-if="showIcon"></Trash>
    <span v-if="showText">删除</span>
  </div>
</template>

<script setup lang="ts">
import Trash from "../icons/IconTrash.vue";

import { useRouter } from "vue-router";
import { Node } from "../entities/Node";
import { useToastStore } from "../stores/ToastStore";

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

const deleteBookNode = function () {
  router.push("/lessons/" + props.node.parentId + "/show");
  useToastStore().set(props.node.delete());
};
</script>
