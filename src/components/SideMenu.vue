<template>
  <div class="drawer-side w-full">
    <div class="z-20 items-center gap-2 px-1 py-2 hidden lg:flex fixed top-8 bg-transparent">
      <ul class="menu z-20">
        <li tabindex="0">
          <a href="javascript:void(0)" aria-current="page" aria-label="Homepage" class="flex-0 px-2">
            <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
              <span>{{ book.title }}</span>
            </div>
          </a>
          <ul class="bg-base-300 shadow-2xl">
            <li v-for="book in books">
              <Link v-bind:href="book.id">{{ book.title }}</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="overscroll-auto overflow-auto h-screen mt-12 mb-24 pb-48">
      <ul class="menu menu-compact flex flex-col p-0 px-1 overflow-scroll" v-for="item in book.children">
        <li></li>
        <SideMenuItem :item="item"></SideMenuItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Link from "./Link.vue";
import SideMenuItem from "./SideMenuItem.vue";

export default defineComponent({
  computed: {
    book() {
      return store.current.book();
    },
    books() {
      return this.book.parent().children;
    },
  },
  components: { Link, SideMenuItem },
});
</script>
