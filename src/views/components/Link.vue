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
import { Node } from "../../models/Node";
import { useRoute, useRouter } from "vue-router";

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
  if (props.node.isChapter && !props.node.isTab) return false;

  return (
    current.value.getParents().some((parent) => {
      return parent.id == id;
    }) || current.value.id == id
  );
};
</script>

<style scoped lang="postcss">
li {
  @apply list-none text-base
}
</style>