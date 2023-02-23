<template>
  <div class="w-full flex flex-col">
    <!-- 章节与页面 -->
    <div class="overscroll-auto overflow-auto h-screen mt-0 mb-24 pb-48 pr-4 pt-12">
      <ul class="menu menu-compact flex flex-col w-full p-0 px-1 overflow-scroll" v-for="(item, index) in chapters">
        <li v-if="index > 0"></li>
        <ManualItem :item="item" :id="item.id"></ManualItem>
      </ul>
      <div class="pointer-events-none sticky bottom-0 flex h-20"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Children from "./Children.vue";
import Link from "./Link.vue";
import ManualItem from "./ManualItem.vue";

export default defineComponent({
  computed: {
    book: () => RouteController.getCurrentPage().getBook(),
    books() {
      return this.book.siblings();
    },
    chapters() {
      return this.book.getManuals();
    },
  },
  mounted: function () {
    // 滚动到激活的菜单的章节
    var current = RouteController.getCurrentPage();
    var target = document.getElementById(current.getParent().id);

    if (target) target.scrollIntoView();
  },
  components: { Link, ManualItem, Children },
});
</script>
