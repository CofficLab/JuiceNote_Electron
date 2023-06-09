<template>
  <router-link v-bind:data-id="node.id" :to="{
    name: 'nodes.show',
    params: { id: node.id,tree: tree.slug },
  }">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Node } from "../entities/Node";
import { useNodeStore } from "../stores/NodeStore";

defineProps({
  node: {
    type: Node,
    required: true,
  },
});

const tree = computed(() => useNodeStore().tree);
</script>

<style scoped lang="postcss">
li {
  @apply list-none text-base;
}
</style>
