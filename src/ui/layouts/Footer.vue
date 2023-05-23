<template>
  <footer>
    <div class="flex flex-row justify-between">
      <Tree :tree="tree" :active-nodes="activeNodes" :display="'breadcrumbs'" :current-node="current"></Tree>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed} from "vue";
import { useNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";

const current = computed(() => useNodeStore().current);
const activeNodes = computed(() => useNodeStore().activeNodes);
const tree = computed(() => useNodeStore().root)
</script>
