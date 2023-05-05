<template>
  <div>
    <div v-show="!shouldHide" :class="{
      'flex flex-row items-center p-0 text-xs': true,
      'hover:bg-primary-focus/20': !shouldActive(),
      'bg-primary text-primary-content': shouldActive() && (tree.isPage || tree.isTab),
      'bg-primary/5': shouldActive() && tree.isChapter && !tree.isTab,
    }">
      <Link :node="tree" @click="setOpen" :class="{
        'flex flex-grow cursor-pointer flex-row items-center gap-2 px-2 py-2': true,
        'font-bold text-opacity-50': tree.isChapter && !tree.isTab,
      }">
      <IconBook v-if="tree.isBook" class="h-4 w-4"></IconBook>
      <IconChapter v-if="tree.isChapter && !tree.isTab" class="h-4 w-4"></IconChapter>
      <IconDatabase v-if="tree.id == 0" class="h-4 w-4"></IconDatabase>
      <IconPage v-if="tree.isPage || tree.isTab" class="h-4 w-4"></IconPage>

      {{ tree.title }}
      </Link>

      <!-- 折叠按钮 -->
      <div @click="toggle" v-if="(tree.isChapter) || tree.isBook" class="btn-ghost rounded-none btn-square btn-sm btn">{{
        open ? "-" : "+" }}</div>
    </div>

    <!-- 子节点 -->
    <div class="flex flex-col rounded-none pl-2" v-if="(tree.getChildren().length > 0 && open) || shouldHide">
      <BTree v-for="child in tree.getChildren()" :tree="child" :current-node="currentNode"></BTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { EmptyNode, Node, RootNode } from "../entities/Node";
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
  currentNode: {
    type: Node,
    default: EmptyNode,
  },
  hiddenList: {
    type: Array,
    default: () => [],
  }
});

const shouldActive = (node?: Node) => {
  if (node == undefined) node = props.tree

  return node.id == props.currentNode.id || props.currentNode.getParents().some((parent) => parent.id == node!.id);
};
const shouldHide = computed(() => {
  return props.hiddenList.includes(props.tree.id)
})

let open = ref(shouldActive())

const toggle = () => {
  open.value = !open.value;
};
const setOpen = () => {
  open.value = true;
}
</script>
