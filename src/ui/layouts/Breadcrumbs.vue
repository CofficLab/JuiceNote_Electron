<template>
  <div class="breadcrumbs flex h-full flex-grow justify-start overflow-visible text-xs" :class="{ 'text-yellow-500': editable }">
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown-hover dropdown-top dropdown flex justify-center" v-if="breadcrumb.getSiblings().length > 0">
          <label
            tabindex="0"
            :class="{ 'text-info': !breadcrumb.isVisible }"
            class="flex flex-row items-center gap-1 self-center rounded px-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2"
          >
            <IconShop class="h-4 w-4" v-if="breadcrumb.isShop"></IconShop>
            <IconDatabase class="h-4 w-4" v-if="breadcrumb.isDatabase"></IconDatabase>
            <IconHome class="h-4 w-4" v-if="breadcrumb.isHome"></IconHome>
            <IconBook class="h-4 w-4" v-if="breadcrumb.isBook"></IconBook>
            <IconChapter class="h-4 w-4" v-if="breadcrumb.isChapter"></IconChapter>
            <IconPage class="h-4 w-4" v-if="breadcrumb.isPage"></IconPage>
            {{ breadcrumb.title }}
            <span v-if="editable">[{{ breadcrumb.id }}]</span>
          </label>

          <div class="dropdown-content mt-0 pt-4" v-if="breadcrumb.isLesson">
            <ul tabindex="0" class="siblings-list">
              <BTree :tree="breadcrumb.getParent()" :depth="breadcrumb.getParents().length"></BTree>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";
import IconBook from "../icons/IconBook.vue";
import IconChapter from "../icons/IconChapter.vue";
import IconPage from "../icons/IconPage.vue";
import IconDatabase from "../icons/IconDatabase.vue";
import IconShop from "../icons/IconShop.vue";
import IconHome from "../icons/IconHome.vue";
import BTree from "./BTree.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";

const route = useRoute();
const current = computed(() => useCurrentNodeStore().current);

const getBreadcrumbs = (currentNode?:Node) => RouteBox.getBreadcrumbs(route,currentNode);

const editable = computed(() => RouteBox.isEditable(route));
let breadcrumbs = ref(getBreadcrumbs());

window.addEventListener("nodeUpdated", function () {
  breadcrumbs.value = getBreadcrumbs();
});

watch(route, function () {
  breadcrumbs.value = getBreadcrumbs();
});

watch(current, function () {
  breadcrumbs.value = getBreadcrumbs(current.value);
});
</script>

<style lang="postcss" scoped>
.siblings-list {
  @apply rounded-box min-h-16 max-h-96 w-56 gap-2 overflow-y-scroll bg-base-300/90 px-6 py-6 shadow-2xl backdrop-blur backdrop-filter;
}
</style>
