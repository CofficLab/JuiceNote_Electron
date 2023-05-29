<template>
  <div @click="markAsChapter">
    <IconChapter :class="'h-6 w-6'" v-if="showIcon"></IconChapter>
    <span v-if="showText">设置类型为章节</span>
  </div>
</template>

<script setup lang="ts">
import IconChapter from "../icons/IconChapter.vue";

import { useRouter } from "vue-router";
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

const markAsChapter = function () {
  props.node.isChapter = true;
  props.node.isPage = false
  props.node.update().then(() => {
    useToastStore().set(`「${props.node.title}」已设置为章节`)
  })
};
</script>
