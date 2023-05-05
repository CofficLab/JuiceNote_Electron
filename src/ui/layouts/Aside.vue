<template>
  <aside>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full bg-accent" v-if="!isWindows">
      <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <BTree :tree="book!" :current-node="current!" class="h-full overflow-scroll pb-24"></BTree>

    <!-- 底部的图书logo -->
      <div v-if="book!.cover.length > 0" class=" bottom-0 fixed h-20 opacity-90 backdrop-blur-sm backdrop-filter dark:brightness-50">
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
import BTree from "./BTree.vue";

const route = useRoute();
const nodeStore = useCurrentNodeStore();
const routeBox = new RouteBox(route);
const book = ref(routeBox.getCurrentBook());
const isWindows = Preload.isWindows();
const current = computed(() => nodeStore.current);
const hideTitleBar = false;

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
