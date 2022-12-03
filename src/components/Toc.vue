<template>
  <div class="h-full overflow-scroll">
    <!-- 其他编程语言 -->
    <ul class="menu p-2 mr-1 shadow w-36 bg-base-100 rounded-box mt-2" v-show="menus.length > 1">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.book().title }}</Link>
      </li>
    </ul>
    <div class="table-of-contents overflow-scroll" v-html="toc"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    toc(): string {
      let current = store.current;
      return current.toc();
    },
    menus: function () {
      let menus = store.root.search(store.current.title);

      menus = menus.filter(function (menu) {
        return menu.parent().title == store.current.parent().title;
      });

      return menus;
    },
  },
  components: { Link },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply prose-sm w-full;

  ul {
    @apply w-full relative hover:bg-transparent !important;

    li {
      @apply m-2 text-sm w-full h-full rounded;

      a {
        @apply no-underline rounded-lg z-0 h-full w-full p-2 block hover:bg-sky-300/30;
      }
    }
  }
}
</style>
