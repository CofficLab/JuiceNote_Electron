<template>
  <div class="border-b border-green-900/50 bg-slate-500/30">
    <BookOpen v-if="showIcon"></BookOpen>
    <span v-if="showText">节点：「{{ node.title }}」</span>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import BookOpen from "../icons/book-open.svg";
import { Node } from "../entities/Node";

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
</script>
