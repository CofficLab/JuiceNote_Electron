<template>
  <div class="h-full">
    <div class="grid grid-cols-6">
      <Book :book="book" v-for="book in children"></Book>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Book from '../components/Book.vue'
import { computed, onMounted, ref } from "vue";
import { useNodeStore } from "../stores/NodeStore";

const nodeStore = useNodeStore();
const tree = computed(() => nodeStore.tree)
const children = ref()

onMounted(() => {
  tree.value.getChildren().then((c) => {
    children.value = c
  })
})
</script>

<style lang="postcss">
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-yellow-300/30 shadow-2xl;
}

table {
  @apply rounded-none;

  td,
  th {
    @apply border border-gray-700 p-2 !important;
  }

  p {
    @apply my-0 !important;
  }
}
</style>
