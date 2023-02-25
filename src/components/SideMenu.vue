<template>
  <div class="flex w-full flex-col">
    <!-- 图书名 -->
    <div class="fixed z-50 flex h-24 w-56 flex-col border-b border-gray-300 bg-base-200 shadow-sm">
      <h1
        class="flex h-full items-center justify-center border-r-2 border-gray-300 text-lg text-primary md:text-2xl lg:text-3xl xl:text-3xl"
      >
        {{ book.name }}
      </h1>

      <!-- 教程与手册的TAB -->
      <div class="tabs flex justify-center border-r-2 border-gray-300" v-if="tabs.length > 0">
        <a class="tab tab-lifted" v-for="tab in tabs" v-bind:class="{ 'tab-active': tab.shouldActive() }"
          ><Link :href="tab.id">{{ tab.name }}</Link></a
        >
      </div>
    </div>

    <!-- 章节与页面 -->
    <div class="mt-0 mb-24 h-screen overflow-auto overscroll-auto pb-48 pr-4 pt-24">
      <ul class="menu menu-compact flex w-full flex-col overflow-scroll p-0 px-1" v-for="(item, index) in chapters">
        <li v-if="index > 0"></li>
        <SideMenuItem :item="item" :id="item.id"></SideMenuItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import BookNode from "../entities/BookNode";
import Children from "./Children.vue";
import Link from "./Link.vue";
import SideMenuItem from "./SideMenuItem.vue";

export default defineComponent({
  data() {
    return {
      activeSubBookId: "",
    };
  },
  computed: {
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
    var current = RouteController.getCurrentPage();
    var target = document.getElementById(current.getParent().id);

    if (target) target.scrollIntoView();
  },
  components: { Link, SideMenuItem, Children },
});
</script>
