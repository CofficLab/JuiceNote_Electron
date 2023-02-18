<template>
  <div>
    <div class="drawer-side w-full">
      <!-- 图书名 -->
      <div class="z-20 items-center gap-2 px-1 py-2 flex bg-transparent">
        <ul class="menu z-20">
          <li tabindex="0">
            <a href="javascript:void(0)" aria-current="page" aria-label="Homepage" class="flex-0 px-2">
              <div
                class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl lg:text-4xl xl:text-5xl"
              >
                <span>{{ book.name }}</span>
              </div>
            </a>
            <ul class="bg-base-300 shadow-2xl overflow-auto h-96">
              <li v-for="book in books">
                <Link v-bind:href="book.id">{{ book.name }}</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 章节 -->
      <div class="overscroll-auto overflow-auto h-screen mt-0 mb-24 pb-48 pr-4">
        <ul class="menu menu-compact flex flex-col p-0 px-1 overflow-scroll" v-for="item in book.getChapters()">
          <li></li>
          <SideMenuItem :item="item" :id="item.dir"></SideMenuItem>
        </ul>
        <div class="pointer-events-none sticky bottom-0 flex h-20"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import store from "../entities/Store";
import Link from "./Link.vue";
import SideMenuItem from "./SideMenuItem.vue";

export default defineComponent({
  computed: {
    book() {
      return RouteController.getCurrentPage().getBook();
    },
    books() {
      return this.book.siblings();
    },
  },
  mounted: function () {
    // 滚动到激活的菜单的章节
    var current = RouteController.getCurrentPage();
    var target = document.getElementById(current.getChapter().id);

    if (target) target.scrollIntoView();
  },
  components: { Link, SideMenuItem },
});
</script>
