<template>
  <div id="side-menus" class="flex h-screen flex-col justify-between overflow-scroll overscroll-none scroll-smooth">
    <SideMenuItem :item="book" :current="current"></SideMenuItem>

    <!-- 底部的图书logo -->
    <div v-if="book.cover.length > 0" class="mt-12 h-20 opacity-90 dark:brightness-50">
      <img :src="book.cover" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, computed, ref } from "vue";
import SideMenuItem from "../components/SideMenuItem.vue";

import { useRoute } from "vue-router";
import Node from "../entities/Node";

const route = useRoute();
const current = computed(() => {
  // console.log('确认当前节点', parseInt(route.params.id.toString()))

  return Node.find(parseInt(route.params.id.toString()));
});
const getBook = () => current.value.getBook();
let book = ref(getBook());

// console.log(book.value)

window.addEventListener("nodeUpdated", () => {
  book.value = getBook();
});

watch(
  route,
  () => {
    book.value = getBook();
    nextTick(() => {
      setTimeout(() => {
        document.querySelector(`#side-menus [data-id="${route.params.id}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    });
  },
  { immediate: true }
);
</script>
