<template>
  <div>
    <ul class="flex flex-col px-1 text-sm">
      <li v-if="!item.isBook" v-on:contextmenu="showRightMenu" @click="goto(item)" class="btn-ghost btn flex justify-start" :class="{ 'btn-active': shouldActive(item) }">
        <DynamicPadding :count="item.getParents().length - 3"></DynamicPadding>
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
