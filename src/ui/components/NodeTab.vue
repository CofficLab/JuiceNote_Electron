<template>
  <div class="tabs-container" v-if="current.getParent().isTab">
    <button class="tab" :class="{ 'tab-active': shouldActive(sibling.id) }" v-for="sibling in current.getSiblings()">
      <Link :node="sibling">{{ sibling.title }}</Link>
    </button>
  </div>

  <div class="tabs-container" v-if="current.isTab">
    <Link v-for="child in current.getChildren()" class="tab tab-lifted" :node="child">{{ child.title }}</Link>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Link from "../components/Link.vue";
import  NodeApi  from "../api/NodeApi";
import { useNodeStore } from "../stores/NodeStore";

const current = computed(() => useNodeStore().current);

const shouldActive = function (id) {
  let node = NodeApi.find(id);

  if (node.isPage) return current.value!.id == id;

  if (node.isTab)
    return current.value.getParents().some((parent) => {
      return parent.id == id;
    });

  if (node.isChapter && node.getChildren().length == 0) return current.value.id == id;

  return false;
};
</script>

<style lang="postcss">
.tabs-container {
  @apply tabs tabs-boxed mx-auto flex justify-center gap-4 bg-opacity-80 backdrop-blur backdrop-filter;
}
</style>
