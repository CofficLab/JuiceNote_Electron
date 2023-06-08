<template>
  <div class="flex flex-row gap-4">
    <IconBook v-if="showIcon"></IconBook>
    <span v-if="showText">更换封面</span>
  </div>
</template>

<script lang="ts" setup>
import IconBook from '../icons/IconBook.vue';
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
