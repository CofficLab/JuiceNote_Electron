<template>
  <footer>
    <!-- <Breadcrumbs :current="current"></Breadcrumbs> -->
    <BTree :tree="DatabaseNode" :display="'breadcrumbs'" :current-node="current"></BTree>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import BTree from "./BTree.vue";
import { DatabaseNode } from "../entities/Node";

const current = computed(() => useCurrentNodeStore().current);
</script>
