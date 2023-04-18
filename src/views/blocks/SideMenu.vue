<template>
  <div id="side-menus" class="flex flex-col overflow-scroll overscroll-none scroll-smooth">
    <SideMenuItem :item="book" :current="current"></SideMenuItem>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, computed,ref } from "vue";
import SideMenuItem from "../components/SideMenuItem.vue";
import { Node } from "../../models/Node";
import { useRoute } from "vue-router";

const route = useRoute();
const current = computed(() => Node.find(parseInt(route.params.id.toString())));
const getBook = () => current.value.getBook()
let book = ref(getBook());

window.addEventListener("nodeUpdated", () => {
  book.value = getBook()
});

watch(
  route,
  () => {
    book.value = getBook()
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

<style scoped lang="postcss">
#book-name {
  @apply flex justify-center bg-gradient-to-r from-red-500 to-cyan-500 bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl;
}

.book-info {
  @apply flex flex-col bg-base-200/80 pt-1 shadow drop-shadow dark:border-cyan-900/10;
}
</style>
