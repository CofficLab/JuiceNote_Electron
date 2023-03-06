<template>
  <div>
    <!-- 是一个页面 -->
    <li v-if="item.isPage()">
      <Link class="flex gap-4 xl:text-lg" v-bind:href="item.id">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.name }}
      </Link>
    </li>

    <!-- 是一个章节，且不是TAB -->
    <li
      v-if="item.isChapter() && !item.isTab()"
      :class="{
        'text-indigo-400/90': item.isLesson(),
        'text-cyan-900/90': item.isManual(),
      }"
      v-bind:id="item.id"
    >
      <span v-bind:class="{ 'text-xl': item.level < 3, 'text-lg': item.level >= 3 }">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.name }}
      </span>
    </li>
    <SideMenuItem v-for="sub in item.getChildren()" v-if="item.isChapter() && !item.isTab()" :item="sub"></SideMenuItem>

    <!-- 是一个章节，且是TAB -->
    <li v-if="item.isChapter() && item.isTab()" v-bind:id="item.id">
      <Link class="flex gap-4 xl:text-lg" v-bind:href="item.id">
        <DynamicPadding :count="item.level - 3"></DynamicPadding>
        {{ item.name }}
      </Link>
    </li>

    <!-- 是一个章节，且无子节点 -->
    <li
      v-if="item.isChapter() && item.getChildren().length == 0"
      :class="{
        'text-indigo-400/90': !item.isManual(),
        'text-cyan-900/90': item.isManual(),
      }"
    >
      <span> <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>{{ item.name }}</span>
    </li>
    <li v-if="item.isChapter() && item.getChildren().length == 0">
      <Link class="flex gap-4" v-bind:href="item.id"> _空_ </Link>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BookNode from "../../entities/BookNode";
import DynamicPadding from "../components/DynamicPadding.vue";
import Link from "../components/Link.vue";

export default defineComponent({
  components: { Link, DynamicPadding },
  props: {
    item: {
      type: BookNode,
      required: true,
    },
  },
});
</script>
