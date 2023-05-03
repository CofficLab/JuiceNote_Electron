<template>
  <aside>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full bg-base-200" v-if="!isWindows">
      <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <!-- 是一个图书 -->
    <div class="sticky z-40 mb-4 bg-base-200 bg-opacity-90 shadow backdrop-blur backdrop-filter" :class="{ 'top-10': !hideTitleBar, 'top-0': hideTitleBar }">
      <Link :node="book!" class="flex justify-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl">{{ book!.title }}</Link>

      <!-- 图书的TAB，比如：教程、手册 -->
      <div class="tabs flex justify-center" v-if="book!.getTabs().length > 0">
        <Link class="tab tab-lifted" :class="{ 'tab-active': shouldActive(tab) }" v-for="tab in book!.getTabs()" :node="tab">{{ tab.title }}</Link>
      </div>
    </div>

    <SideMenuItem class="flex flex-grow" :item="book!" :current="current!"></SideMenuItem>

    <!-- 底部的图书logo -->
    <div v-if="book!.cover.length > 0" class="sticky bottom-0 mt-12 h-20 opacity-90 backdrop-blur-sm backdrop-filter dark:brightness-50">
      <img :src="book!.cover" alt="" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { nextTick, watch, computed, ref } from "vue";
import SideMenuItem from "../components/SideMenuItem.vue";
import Link from "../components/Link.vue";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";
import Preload from "../api/Preload";
import { useCurrentNodeStore } from "../stores/NodeStore";

const route = useRoute();
const nodeStore = useCurrentNodeStore();
const routeBox = new RouteBox(route);
const book = ref(routeBox.getCurrentBook());
const isWindows = Preload.isWindows();
const current = computed(() => nodeStore.current);
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
        document.querySelector(`aside [data-id="${route.params.id}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    });
  },
  { immediate: true }
);
</script>
