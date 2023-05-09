<template>
  <router-link v-bind:data-id="node.id" :to="{ name: 'nodes.show', params: { id: node.id } }">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { Node } from "../entities/Node";

defineProps({
  node: {
    type: Node,
    required: true,
  },
});
</script>

<style scoped lang="postcss">
li {
  @apply list-none text-base;
}
</style>
