<template>
  <footer>
    <Tree :tree="DatabaseNode" :display="'breadcrumbs'" :current-node="current"></Tree>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { DatabaseNode } from "../entities/Node";

const current = computed(() => useCurrentNodeStore().current);
</script>
