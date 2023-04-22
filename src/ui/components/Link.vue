<template>
  <router-link
    v-bind:data-id="node.id"
    v-bind:class="{
      'active tab-active': shouldActive(node.id),
    }" :to="{name:'lessons.show',params:{id:node.id}}"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import Node from "../entities/Node";

const route = useRoute();
const props = defineProps({
  node: {
    type: Node,
    required: true,
  },
});

const current = computed(() => {
  return Node.find(parseInt(route.params.id.toString()));
});

const shouldActive = function (id) {
  let node = Node.find(id)

  if (node.isPage) return current.value.id == id

  if (node.isTab) return current.value.getParents().some((parent) => {
      return parent.id == id;
  })

  if (node.isChapter && node.getChildren().length ==0) return current.value.id == id

  return false
};
</script>

<style scoped lang="postcss">
li {
  @apply list-none text-base
}
</style>