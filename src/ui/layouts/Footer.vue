<template>
  <footer>
    <div class="flex flex-row justify-between">
      <Tree :tree="tree" :display="'breadcrumbs'" :current-node="current"></Tree>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed} from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";

const current = computed(() => useCurrentNodeStore().current);
const tree = computed(() => useCurrentNodeStore().root)
</script>
