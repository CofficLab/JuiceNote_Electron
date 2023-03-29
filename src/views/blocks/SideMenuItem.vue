<template>
  <div>
    <!-- 是一个页面或一个tab -->
    <li v-if="item.isPage || item.isTab">
      <Link class="flex gap-4 xl:text-lg" :node="item" :class="{ 'text-green-800': !item.isVisible }">
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
    <SideMenuItem v-for="sub in item.getChildren()" v-if="item.isChapter && !item.isTab" :item="sub" :current="current">
    </SideMenuItem>
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
