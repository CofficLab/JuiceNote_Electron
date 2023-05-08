<template>
  <footer>
    <Tree :tree="tree" :display="'breadcrumbs'" :current-node="current"></Tree>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { DatabaseNode, EmptyNode, ShopNode } from "../entities/Node";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";

const route = useRoute()
const current = computed(() => useCurrentNodeStore().current);
const tree = computed(() => {
  let tree = EmptyNode
  if (RouteBox.isShop(route)) {
    tree = ShopNode
  } else {
    tree = DatabaseNode
  }

  console.log('当前tree', tree.title)

  return tree
})
</script>
