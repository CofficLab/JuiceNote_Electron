<template>
  <div>
    <ul class="flex flex-col px-1 text-xs">
      <li
        v-if="!item.isBook"
        v-on:contextmenu="showRightMenu"
        @click="goto(item)"
        class="my-0 flex cursor-pointer items-center justify-start gap-2 rounded px-4 py-2"
        :class="{ 'bg-primary text-primary-content': shouldActive(item), 'font-bold text-opacity-50': item.isChapter }"
      >
        <DynamicPadding :count="item.getParents().length - (item.isChapter ? 4 : 3)"></DynamicPadding>
        <IconPage v-if="item.isPage" class="h-4 w-4 text-accent" :class="{ 'text-accent-focus': shouldActive(item) }"></IconPage>
        {{ item.title }}
      </li>

      <SideMenuItem v-for="sub in getSubMenus(item)" v-if="!item.isPage && !item.isTab" :item="sub" :current="current"></SideMenuItem>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import DynamicPadding from "./DynamicPadding.vue";
import Node from "../entities/Node";
import RouteBox from "../entities/RouteBox";
import IconPage from "../icons/page.vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  item: Node,
  current: Node,
});

let item = computed(() => props.item ?? props.current.getBook());

const goto = (node) => RouteBox.goto(router, node);
const shouldActive = (node) => RouteBox.isActive(route, node);
const getSubMenus = (node) => RouteBox.getSubMenus(route, node);

const showRightMenu = function (e) {
  dispatchEvent(
    new CustomEvent("show-right-menus", {
      detail: {
        x: e.x,
        y: e.y,
        node: props.item,
      },
    })
  );
};
</script>
