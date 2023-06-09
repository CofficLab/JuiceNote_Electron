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
const nodeStore = useNodeStore()
const current = computed(() => nodeStore.current);
const activeNodes = computed(() => nodeStore.activeNodes);
const tree = computed(() => nodeStore.tree)

const url = computed(() => {
  return route.fullPath
})
</script>
