<template>
  <div>
    <!-- 是一个页面 -->
    <li v-if="item.isPage">
      <Link class="flex gap-4 xl:text-lg" :id="item.id" :node="item">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.title }}
      </Link>
    </li>

    <!-- 是一个章节，且不是TAB -->
    <li
      :id="'node-' + item.id"
      v-if="item.isChapter && !item.isTab"
      :class="{
        'text-indigo-400/90': item.isLesson,
        'text-cyan-900/90': item.isManual,
      }"
    >
      <span v-bind:class="{ 'text-xl': item.level < 3, 'text-lg': item.level >= 3 }">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.title }}
      </span>
    </li>
    <SideMenuItem
      v-for="sub in item.getChildren()"
      v-if="item.isChapter && !item.isTab"
      :item="sub"
      :current="current"
    ></SideMenuItem>

    <!-- 是一个章节，且是TAB -->
    <li v-if="item.isChapter && item.isTab">
      <Link class="flex gap-4 xl:text-lg" :id="item.id" :node="item">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.title }}
      </Link>
    </li>

    <!-- 是一个章节，且无子节点 -->
    <li
      v-if="item.isChapter && item.getChildren().length == 0"
      :class="{
        'text-indigo-400/90': !item.isManual,
        'text-cyan-900/90': item.isManual,
      }"
    >
      <span> <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>{{ item.title }}</span>
    </li>
    <li v-if="item.isChapter && item.getChildren().length == 0">
      <Link class="flex gap-4" v-bind:id="item.id" :node="item"> _空_ </Link>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Node } from "../../models/Node";
import DynamicPadding from "../components/DynamicPadding.vue";
import Link from "../components/Link.vue";

export default defineComponent({
  components: { Link, DynamicPadding },
  props: {
    item: {
      type: Node,
      required: true,
    },
    current: {
      type: Node,
      required: true,
    },
  },
});
</script>
