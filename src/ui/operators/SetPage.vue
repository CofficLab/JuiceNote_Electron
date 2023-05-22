<template>
  <div @click="markAsPage">
    <IconPage :class="'h-6 w-6'" v-if="showIcon"></IconPage>
    <span v-if="showText">设置类型为页面</span>
  </div>
</template>

<script setup lang="ts">
import { Node } from "../entities/Node";
import IconPage from "../icons/IconPage.vue";
import { useToastStore } from "../stores/ToastStore";

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

const markAsPage = function () {
  props.node.isChapter = false;
  props.node.isPage = true
  props.node.update().then(() => {
    useToastStore().set(`「${props.node.title}」已设置为页面`)
  })
};
</script>
