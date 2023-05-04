<template>
  <div class="w-full overflow-scroll px-8">
    <div class="overflow-scroll bg-base-100">
      <div class="flex flex-row items-center hover:bg-base-200">
        <div  @click="toggle" v-if="!tree.isPage" class="btn btn-square btn-sm btn-ghost">{{ open ? "-" : "+" }}</div>
        <Link :node="tree" class="flex cursor-pointer flex-row gap-2 btn btn-ghost btn-sm">
          <IconBook v-if="tree.isBook"></IconBook>
          <IconChapter v-if="tree.isChapter"></IconChapter>
          <IconDatabase v-if="tree.id == 0"></IconDatabase>
          <IconPage v-if="tree.isPage"></IconPage>
          {{ tree.title }}
        </Link>
      </div>

      <div class="flex flex-col gap-2 rounded-none" v-if="tree.getChildren().length > 0 && open">
        <BTree v-for="child in tree.getChildren()" :tree="child"></BTree>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Node, RootNode } from "../entities/Node";
import IconPage from "../icons/IconPage.vue";
import IconChapter from "../icons/IconChapter.vue";
import IconDatabase from "../icons/IconDatabase.vue";
import IconBook from "../icons/IconBook.vue";
import Link from "../components/Link.vue";

const props = defineProps({
  tree: {
    type: Node,
    default: RootNode,
  },
});

const open = ref(props.tree.getParents().length <1);

const toggle = () => {
  open.value = !open.value;
};
</script>
