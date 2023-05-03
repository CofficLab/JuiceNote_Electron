<template>
  <div class="flex flex-row gap-4">
    <PhotoIcon v-if="showIcon"></PhotoIcon>
    <span v-if="showText">更换封面</span>
  </div>
</template>

<script lang="ts" setup>
import PhotoIcon from "../icons/photo.svg";
import { Node } from "../entities/Node";

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
</script>
