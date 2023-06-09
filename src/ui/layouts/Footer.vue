<template>
  <footer>
    <div class="flex flex-row justify-between w-full h-full items-center">
      <Tree :tree="tree" name="footer" :active-nodes="activeNodes" :display="'breadcrumbs'" class="h-full flex items-center" :current-node="current"></Tree>

      <div v-html="url" class="flex items-center text-sm" v-if="isDev"></div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed} from "vue";
import { useNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { useRoute } from "vue-router";
import Preload from "../api/Preload";

const route = useRoute()
const nodeStore = useNodeStore()
const current = computed(() => nodeStore.current);
const activeNodes = computed(() => nodeStore.activeNodes);
const tree = computed(() => nodeStore.tree)
const isDev = Preload.isDev()

const url = computed(() => {
  return route.fullPath
})
</script>
