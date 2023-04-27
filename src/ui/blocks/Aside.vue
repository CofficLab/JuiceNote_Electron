<template>
  <aside class="fixed left-0 z-40 hidden h-screen w-40 border-r border-base-300 bg-base-300 shadow-xl lg:flex lg:flex-col">
    <div id="side-menus" class="flex h-screen flex-col justify-between overflow-scroll overscroll-none scroll-smooth">
      <SideMenuItem :item="book" :current="current"></SideMenuItem>

      <!-- 底部的图书logo -->
      <div v-if="book.cover.length > 0" class="mt-12 h-20 opacity-90 dark:brightness-50">
        <img :src="book.cover" alt="" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { nextTick, watch, computed, ref } from "vue";
import SideMenuItem from "../components/SideMenuItem.vue";

import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";

const route = useRoute();
const routeBox = new RouteBox(route);

const book = ref(routeBox.getCurrentBook());
const current = computed(() => routeBox.getCurrentNode());

window.addEventListener("nodeUpdated", () => {
  book.value = routeBox.getCurrentBook();
});

watch(
  route,
  () => {
    book.value = RouteBox.getCurrentBook(route);
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
