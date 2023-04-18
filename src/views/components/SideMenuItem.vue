<template>
  <div>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full bg-base-300" v-if="!isWindows && item.isBook">
      <div class="draggable" :class="{ 'h-8': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <!-- 是一个图书 -->
    <div class="sticky z-40 bg-base-200" :class="{ 'top-8': !hideTitleBar, 'top-0': hideTitleBar }" v-if="item.isBook">
      <Link :node="item" class="flex justify-center bg-gradient-to-r from-red-500 to-cyan-500 bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl">{{ item.title }}</Link>

      <!-- 图书的TAB，比如：教程、手册 -->
      <div class="tabs flex justify-center" v-if="item.getTabs().length > 0">
        <Link class="tab-lifted tab" v-for="tab in item.getTabs()" :node="tab">{{ tab.title }}</Link>
      </div>
    </div>

    <ul class="menu menu-compact flex w-full flex-col p-0 px-1">
      <!-- 是一个页面或一个tab -->
      <li v-if="item.isPage || item.isTab">
        <Link class="3xl:text-lg flex gap-4" :node="item" :class="{ 'text-info': !item.isVisible }">
          <DynamicPadding :count="item.level - 3"></DynamicPadding>
          {{ item.title }}
        </Link>
      </li>

      <!-- 是一个章节 -->
      <li v-if="item.isChapter && !item.isTab" class="text-indigo-400/70">
        <Link class="text-lg" :node="item">
          <DynamicPadding :count="item.level - 3"></DynamicPadding>
          {{ item.title }}
        </Link>
      </li>

      <SideMenuItem v-for="sub in getSubMenus(item)" v-if="!item.isPage && !item.isTab" :item="sub" :current="current"></SideMenuItem>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch,nextTick } from "vue";
import { useRoute } from "vue-router";
import { Node } from "../../models/Node";
import DynamicPadding from "./DynamicPadding.vue";
import Link from "./Link.vue";
import FullScreenController from "../../controllers/FullScreenController";

const route = useRoute();

const props = defineProps({
  item: Node,
  current: Node,
});

let item = computed(()=>props.item ?? props.current.getBook());

const editable = computed(() => route.name == "lessons.edit");
let hideTitleBar = computed(() => FullScreenController.full);
let isWindows = require("electron").ipcRenderer.sendSync("get-platform") == "win32";

const getSubMenus = function (menu) {
  if (menu.isBook && menu.getTabs().length > 0) {
    return props.current.getFirstTabInParents()?.getChildren();
  }

  return editable.value ? menu.getChildren() : menu.getVisibleChildren();
};
</script>
