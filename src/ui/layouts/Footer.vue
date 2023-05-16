<template>
  <footer>
    <Tree :tree="tree" :display="'breadcrumbs'" :current-node="current"></Tree>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";

const current = computed(() => useCurrentNodeStore().current);
const tree = computed(() => {
  console.log('初始化footer', useCurrentNodeStore().root)
  return useCurrentNodeStore().root
})
</script>
