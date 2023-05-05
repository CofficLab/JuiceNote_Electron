<template>
  <footer>
    <!-- <Breadcrumbs :current="current"></Breadcrumbs> -->
    <BTree :tree="DatabaseNode" :display="'row'" :current-node="current" :active-ones-show-only="true"></BTree>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import BTree from "./BTree.vue";
import { DatabaseNode } from "../entities/Node";

const current = computed(() => useCurrentNodeStore().current);
</script>
