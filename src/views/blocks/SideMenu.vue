<template>
  <div class="flex flex-col overflow-scroll">
    <div class="sticky top-0 z-50">
      <!-- 空白，用于拖动 -->
      <div class="z-50 w-full bg-base-300">
        <div class="draggable" :class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }"></div>
      </div>
      <!-- 图书信息 -->
      <div class="book-info" :class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <!-- 图书名 -->
        <h1 id="book-name">{{ book.title }}</h1>

        <!-- 图书的TAB，比如：教程、手册 -->
        <div class="tabs flex justify-center" v-if="bookTabs.length > 0">
          <Link class="tab tab-lifted" v-for="tab in bookTabs" :node="tab">{{ tab.title }}</Link>
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
      <div v-if="book.getLogoUrl().length > 0" class="h-20 opacity-90 dark:brightness-50">
        <img :src="book.getLogoUrl()" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FullScreenController from "../../controllers/FullScreenController";
import Children from "../components/Children.vue";
import Link from "../components/Link.vue";
import SideMenuItem from "./SideMenuItem.vue";
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";

export default defineComponent({
  data() {
    return {
      activatedBookTab: this.book,
    };
  },
  computed: {
    current: () => NodeController.getCurrentPage(),
    hideTitleBar: () => FullScreenController.full,
    book(): Node {
      return this.current.getBook();
    },
    bookTabs() {
      return this.book.getTabs();
    },
    menusRoot() {
      if (this.bookTabs.length > 0) {
        return this.current.getParents().find((parent) => parent.getParent().isBook);
      }

      return this.book;
    },
    menus() {
      // console.log("获取左侧栏菜单");
      return this.menusRoot.getChildren();
    },
  },
  methods: {
    // 滚动到激活的菜单的章节
    scrollToCurrent() {
      var target = document.getElementById("node-" + this.current.id);
      // console.log(target);
      // console.log("需要滚动");
      if (target != null) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollToCurrent();
      }, 600);
    });

    if (this.bookTabs.length > 0) {
      this.activatedBookTab = this.bookTabs[0];
    }
  },
  watch: {
    current() {
      // console.log("current发生变化，滚动到current");
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollToCurrent();
        }, 600);
      });
    },
  },
  components: { Link, SideMenuItem, Children },
});
</script>

<style scoped lang="postcss">
#book-name {
  @apply flex justify-center bg-gradient-to-r from-red-500 to-cyan-500 bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl;
}
.book-info {
  @apply flex flex-col bg-base-300/90 dark:border-cyan-900/10;
}
</style>
