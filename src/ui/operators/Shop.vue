<template>
  <div @click="gotoShop"><Shop></Shop></div>
</template>

<script setup>
import Shop from "../icons/IconShop.vue";
import { ShopNode } from '../entities/Node'
import { useNodeStore } from "../stores/NodeStore";

const nodeStore = useNodeStore()

const gotoShop = () => {
  console.log("gotoShop");
  nodeStore.updateCurrent(ShopNode)
}
</script>
