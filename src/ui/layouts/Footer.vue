<template>
  <footer>
    <div class="flex flex-row justify-between">
      <Tree :tree="tree" :display="'breadcrumbs'" :current-node="current"></Tree>
      <div v-html="address" class="text-secondary/90 flex items-center"></div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const current = computed(() => useCurrentNodeStore().current);
const address = ref(location.href);
const tree = computed(() => useCurrentNodeStore().root)

watch(route, () => address.value = location.href)
</script>
