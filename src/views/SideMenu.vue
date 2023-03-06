<template>
  <div class="flex flex-col overflow-scroll">
    <!-- 固定在左上角的内容 -->
    <div class="sticky top-0 z-50">
      <!-- 空白，用于拖动 -->
      <div class="z-50 w-full bg-base-300">
        <div class="draggable" v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }"></div>
      </div>
      <!-- 图书信息 -->
      <div
        class="flex flex-col bg-base-300/90 dark:border-cyan-900/10"
        v-bind:class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }"
      >
        <!-- 图书名 -->
        <h1
          class="flex justify-center bg-gradient-to-r from-red-500 to-cyan-500 bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl"
        >
          {{ book.name }}
        </h1>

        <!-- 教程与手册的TAB -->
        <div class="tabs flex justify-center" v-if="tabs.length > 0">
          <Link
            v-for="tab in tabs"
            v-bind:class="{ 'tab-active': tab.shouldActive() }"
            :href="tab.id"
            class="tab-lifted tab"
            >{{ tab.name }}</Link
          >
        </div>
      </div>
    </div>

    <!-- 章节与页面 -->
    <div class="h-full pb-24">
      <ul class="menu menu-compact flex w-full flex-col p-0 px-1" v-for="(item, index) in chapters">
        <li v-if="index > 0"></li>
        <SideMenuItem :item="item" :id="item.id"></SideMenuItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>

      <!-- 底部的图书logo -->
      <div v-if="book.hasLogo()" class="h-20 opacity-90 dark:brightness-50">
        <img :src="book.logoUrl()" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FullScreenController from "../controllers/FullScreenController";
import RouteController from "../controllers/RouteController";
import BookNode from "../entities/BookNode";
import Children from "./components/Children.vue";
import Link from "./components/Link.vue";
import SideMenuItem from "./components/SideMenuItem.vue";

export default defineComponent({
  data() {
    return {
      activeSubBookId: "",
    };
  },
  computed: {
    hideTitleBar: () => FullScreenController.full,
    book: () => RouteController.getCurrentPage().getBook(),
    tabs: function (): BookNode[] {
      if (this.book.getChildrenIds().length > 2) {
        return [];
      }

      return this.book.getChildren().filter((child) => {
        return !child.isPage();
      });
    },
    chapters(): BookNode[] {
      if (this.tabs.length > 0) {
        // console.log("当前图书需要展示tabs");
        return this.tabs.find((tab) => tab.shouldActive()).getChildren();
      }

      return this.book.getChildren();
    },
  },
  mounted: function () {
    // 滚动到激活的菜单的章节
    // var current = RouteController.getCurrentPage();
    // var target = document.getElementById(current.getParent().id);
    // if (target) target.scrollIntoView();
  },
  components: { Link, SideMenuItem, Children },
});
</script>
