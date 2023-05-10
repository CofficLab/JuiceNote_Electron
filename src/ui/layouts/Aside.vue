<template>
  <aside>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full bg-accent" v-if="!isWindows">
      <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <div class="sticky top-0 z-40 bg-base-200 bg-opacity-90 shadow backdrop-blur backdrop-filter">
      <!-- 图书 -->
      <Link :node="book!"
        class="flex justify-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl">
      {{ book!.title }}</Link>

      <!-- 图书的TAB，比如：教程、手册 -->
      <div class="tabs flex justify-center" v-if="bookTabs.length > 0">
        <Link :class="{
          'tab-lifted tab': true,
          'tab-active': shouldActive(tab),
        }" v-for="tab in bookTabs" :node="tab">{{ tab.title }}</Link>
      </div>
    </div>

    <Tree :tree="bookActiveTab!" :hidden-list="[bookActiveTab?.id]" :current-node="current!"
      class="h-full overflow-scroll pb-24"></Tree>

    <!-- 底部的图书logo -->
    <div v-if="book && book.cover?.length > 0"
      class=" bottom-0 fixed h-20 opacity-90 backdrop-blur-sm backdrop-filter dark:brightness-50">
      <img :src="book!.cover" alt="" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { nextTick, watch, computed, ref } from "vue";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";
import Preload from "../api/Preload";
import { useCurrentNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import { Node } from '../entities/Node';
import Link from "../components/Link.vue";

const route = useRoute();
const nodeStore = useCurrentNodeStore();
const routeBox = new RouteBox(route);
const book = ref(routeBox.getCurrentBook());
const isWindows = Preload.isWindows();
const current = computed(() => nodeStore.current);
const hideTitleBar = false;
const bookTabs = computed(() => {
  return book.value!.getTabs()
})
const bookActiveTab = computed(() => {
  if (bookTabs.value.length > 0) return bookTabs.value.find((tab) => shouldActive(tab))

  return book.value
})
const shouldActive = (node?: Node) => {
  if (node == undefined) node = book.value!

  return node.id == current.value.id || current.value.getParents().some((parent) => parent.id == node!.id);
};

window.addEventListener("nodeUpdated", () => {
  console.log('aside:监听node updated');
  book.value = routeBox.getCurrentBook();
});

watch(
  route,
  () => {
    book.value = RouteBox.getCurrentBook(route);
    nextTick(() => {
      setTimeout(() => {
        document.querySelector(`aside [data-id="${route.params.id}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    });
  },
  { immediate: true }
);
</script>
