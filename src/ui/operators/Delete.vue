<template>
  <div @click="deleteBookNode">
    <Trash class="h-6 w-6" v-if="showIcon"></Trash>
    <span v-if="showText">删除</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Trash from "../assets/icons/trash.svg";

import { useRoute, useRouter } from "vue-router";
import { Node } from "../entities/Node";
import { useToastStore } from "../stores/Toast";

const router = useRouter();
const route = useRoute();
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
    required: false,
  },
});

const target = computed(() => {
  return props.node ?? Node.find(route.params.id);
});

const deleteBookNode = function () {
  router.push("/lessons/" + target.value.parentId + "/show");
  useToastStore().set(target.value.delete());
};
</script>
