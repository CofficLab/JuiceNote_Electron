<template>
  <li v-if="item.isLeaf()">
    <Link class="flex gap-4" v-bind:href="item.id">
      <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>
      {{ item.title }}
    </Link>
  </li>

  <!-- 目录节点，有子节点 -->
  <li class="menu-title" v-if="item.notLeaf() && item.children.length > 0">
    <span> <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>{{ item.title }}</span>
  </li>
  <SideMenuItem v-for="sub in item.children" v-if="item.notLeaf()" :item="sub"></SideMenuItem>

  <!-- 目录节点，无子节点 -->
  <li class="menu-title" v-if="item.notLeaf() && item.children.length == 0">
    <span> <span class="ml-1" v-if="item.level > 3" v-for="i in item.level - 3"></span>{{ item.title }}</span>
  </li>
  <li v-if="item.notLeaf() && item.children.length == 0">
    <Link class="flex gap-4" v-bind:href="item.id"> _空_ </Link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";

export default defineComponent({
  components: { Link },
  props: ["item"],
});
</script>
