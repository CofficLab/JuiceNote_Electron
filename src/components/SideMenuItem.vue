<template>
  <div>
    <!-- 是一个页面 -->
    <li v-if="item.isPage()">
      <Link class="flex gap-4 xl:text-lg" v-bind:href="item.id">
        <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>
        {{ item.name }}
      </Link>
    </li>

    <!-- 是一个章节 -->
    <li class="text-indigo-400/90" v-if="item.isChapter()" v-bind:id="item.id">
      <span v-bind:class="{ 'text-xl': item.level < 3, 'text-lg': item.level >= 3 }">
        <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>
        {{ item.name }}
      </span>
    </li>
    <SideMenuItem v-for="sub in item.getChildren()" v-if="item.isChapter()" :item="sub"></SideMenuItem>

    <!-- 目录节点，无子节点 -->
    <li class="text-indigo-400/90" v-if="item.isChapter() && item.getChildren().length == 0">
      <span> <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>{{ item.name }}</span>
    </li>
    <li v-if="item.isChapter() && item.getChildren().length == 0">
      <Link class="flex gap-4" v-bind:href="item.id"> _空_ </Link>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";

export default defineComponent({
  components: { Link },
  props: ["item"],
});
</script>
