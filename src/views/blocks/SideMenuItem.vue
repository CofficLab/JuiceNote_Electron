<!-- @format -->

<template>
  <div>
    <!-- 是一个页面或一个tab -->
    <li v-if="item.isPage || item.isTab">
      <Link class="flex gap-4 2xl:text-lg" :node="item" :class="{ 'text-info': !item.isVisible }">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.title }}
      </Link>
    </li>

    <!-- 是一个章节 -->
    <li :id="'node-' + item.id" v-if="item.isChapter && !item.isTab" class="text-indigo-400/70">
      <Link class="text-lg" :node="item">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.title }}
      </Link>
    </li>
    <SideMenuItem v-for="sub in getSubMenus(item)" v-if="item.isChapter && !item.isTab" :item="sub" :current="current"></SideMenuItem>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { Node } from "../../models/Node";
import DynamicPadding from "../components/DynamicPadding.vue";
import Link from "../components/Link.vue";

const route = useRoute();
const editable = computed(() => route.name == "lessons.edit");

const getSubMenus = function (menu) {
  return editable.value ? menu.getChildren() : menu.getVisibleChildren();
};

const props = defineProps({
  item: Node,
  current: Node,
});

watch(editable, () => {
  console.log("side menus 检测到 editable 发生变化");
});
</script>
