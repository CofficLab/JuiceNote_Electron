<template>
  <div class="w-full flex flex-col">
    <!-- 图书名 -->
    <div class="fixed flex bg-base-200 flex-col w-56 z-50 border-b h-24 border-gray-300 shadow-sm">
      <h1
        class="text-primary h-full border-r-2 border-gray-300 flex justify-center text-lg md:text-2xl lg:text-3xl xl:text-3xl"
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
    <div class="overscroll-auto overflow-auto h-screen mt-0 mb-24 pb-48 pr-4 pt-36">
      <ul class="menu menu-compact flex flex-col w-full p-0 px-1 overflow-scroll" v-for="(item, index) in chapters">
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

      return this.book.getChildren();
    },
    chapters(): BookNode[] {
      if (this.tabs.length > 0) {
        console.log("当前图书需要展示tabs");
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
