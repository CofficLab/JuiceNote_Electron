<template>
  <div class="drawer-side" style="scroll-behavior: smooth; scroll-padding-top: 5rem">
    <label for="drawer" class="drawer-overlay"></label>
    <aside>
      <div class="z-20 items-center gap-2 px-4 py-2 hidden lg:flex">
        <a href="javascript:void(0)" aria-current="page" aria-label="Homepage" class="flex-0 px-2"
          ><div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span>{{ book.title }}</span>
          </div></a
        >
      </div>
      <div class="h-4"></div>

      <ul class="menu menu-compact flex flex-col p-0 px-4" v-for="item in book.children">
        <li></li>

        <SideMenuItem :item="item"></SideMenuItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>
    </aside>
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
  },
  components: { Link, SideMenuItem },
});
</script>
