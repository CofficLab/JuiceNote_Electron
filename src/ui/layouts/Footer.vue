<template>
  <footer>
    <div class="flex flex-row justify-between">
      <Tree :tree="tree" name="footer" :active-nodes="activeNodes" :display="'breadcrumbs'" :current-node="current"></Tree>

      <div v-html="url" class="flex items-center text-sm"></div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed} from "vue";
import { useNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { useRoute } from "vue-router";

const route = useRoute()
const current = computed(() => useNodeStore().current);
const activeNodes = computed(() => useNodeStore().activeNodes);
const tree = computed(() => useNodeStore().root)

const url = computed(() => {
  return route.fullPath
})
</script>
