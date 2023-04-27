<template>
  <aside>
    <div id="side-menus" class="flex h-screen flex-col justify-between overflow-scroll overscroll-none scroll-smooth">
      <!-- 空白，用于拖动 -->
      <div class="sticky top-0 z-40 w-full bg-base-300" v-if="!isWindows">
        <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
      </div>

      <!-- 是一个图书 -->
      <div class="sticky z-40 mb-4 bg-base-200" :class="{ 'top-10': !hideTitleBar, 'top-0': hideTitleBar }">
        <Link :node="book" class="flex justify-center bg-gradient-to-r from-red-500 to-cyan-500 bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl">{{ book.title }}</Link>

        <!-- 图书的TAB，比如：教程、手册 -->
        <div class="tabs flex justify-center" v-if="book.getTabs().length > 0">
          <Link class="tab-lifted tab" :class="{ 'tab-active': shouldActive(tab) }" v-for="tab in book.getTabs()" :node="tab">{{ tab.title }}</Link>
        </div>
      </div>

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
import Link from "../components/Link.vue";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";
import Preload from "../entities/Preload";

const route = useRoute();
const routeBox = new RouteBox(route);
const book = ref(routeBox.getCurrentBook());
const isWindows = Preload.isWindows();
const current = computed(() => routeBox.getCurrentNode());
const hideTitleBar = false;
const shouldActive = (node) => RouteBox.isActive(route, node);

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

<style lang="postcss" scope>
aside {
  @apply fixed left-0 z-40 hidden h-screen w-40 border-r border-base-300 bg-base-100  shadow-xl lg:flex lg:flex-col;
}
</style>
