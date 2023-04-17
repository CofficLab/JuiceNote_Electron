<template>
  <div id="side-menus" class="flex flex-col overflow-scroll overscroll-none scroll-smooth">
    <div class="sticky top-0 z-40">
      <!-- 空白，用于拖动 -->
      <div class="z-40 w-full bg-base-300" v-if="!isWindows && !hideTitleBar">
        <div class="draggable" :class="{ 'h-8': !hideTitleBar, 'h-0': hideTitleBar }"></div>
      </div>

      <!-- 图书信息 -->
      <div class="book-info z-40" :class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <!-- 图书名 -->
        <Link :node="book" class="z-40">{{ book.title }}</Link>

        <!-- 图书的TAB，比如：教程、手册 -->
        <div class="tabs flex justify-center" v-if="bookTabs.length > 0">
          <Link class="tab-lifted tab" v-for="tab in bookTabs" :node="tab">{{ tab.title }}</Link>
        </div>
      </div>
    </div>

    <div class="h-full pb-24">
      <!-- 章节与页面 -->
      <ul class="menu menu-compact flex w-full flex-col p-0 px-1" v-for="(item, index) in menus">
        <li v-if="index > 0"></li>
        <SideMenuItem :item="item" :current="current"></SideMenuItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>

      <!-- 底部的图书logo -->
      <div v-if="book.cover.length > 0" class="h-20 opacity-90 dark:brightness-50">
        <img :src="book.cover" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, ref,computed } from "vue";
import FullScreenController from "../../controllers/FullScreenController";
import Link from "../components/Link.vue";
import SideMenuItem from "./SideMenuItem.vue";
import { Node } from "../../models/Node";
import { useRoute } from "vue-router";

const route = useRoute();

let getMenus = computed(() => {
  return (bookTabs.value.length > 0 ? current.value.getFirstTabInParents()?.getVisibleChildren() : book.value.getVisibleChildren())
});

let current = computed(()=>Node.find(parseInt(route.params.id.toString())));
let book = computed(()=>current.value.getBook())
let bookTabs = computed(()=>book.value.getTabs());
let hideTitleBar = computed(()=> FullScreenController.full);
let isWindows = require("electron").ipcRenderer.sendSync("get-platform") == "win32";
let menus = getMenus

window.addEventListener("nodeUpdated", () => {
  menus = getMenus;
});

watch(
  route,
  () => {
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
