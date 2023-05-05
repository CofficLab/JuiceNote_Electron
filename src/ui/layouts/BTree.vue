<template>
  <div>
      <!-- 是一个图书 -->
      <template v-if="tree.isBook">
        <div class="sticky top-0 z-40 mb-4 bg-base-200 bg-opacity-90 shadow backdrop-blur backdrop-filter">
          <Link :node="tree"
            class="flex justify-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text pb-2 text-lg text-transparent md:text-2xl lg:text-3xl">
          {{ tree.title }}</Link>

          <!-- 图书的TAB，比如：教程、手册 -->
          <div class="tabs flex justify-center" v-if="bookTabs.length > 0">
            <Link :class="{
              'tab-lifted tab': true,
              'tab-active': shouldActive(tab),
            }" v-for="tab in bookTabs" :node="tab">{{ tab.title }}</Link>
          </div>
        </div>

        <div class="flex flex-col rounded-none" v-if="bookActiveTab && bookActiveTab.getChildren().length > 0 && open">
          <BTree v-for="child in bookActiveTab!.getChildren()" :tree="child" :current-node="currentNode"></BTree>
        </div>
      </template>

      <!-- 非图书节点 -->
      <template v-else>
        <div :class="{
          'flex flex-row items-center p-0 text-xs': true,
          'hover:bg-primary-focus/20': !shouldActive(),
          'bg-primary text-primary-content': shouldActive() && (tree.isPage || tree.isTab),
          'bg-primary/10': shouldActive() && tree.isChapter && !tree.isTab,
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
          <div @click="toggle" v-if="tree.isChapter && !tree.isTab" class="btn-ghost rounded-none btn-square btn-sm btn">{{ open ? "-" : "+" }}</div>
        </div>

        <!-- 子节点 -->
        <div class="flex flex-col rounded-none" v-if="tree.getChildren().length > 0 && open && !tree.isTab">
          <BTree v-for="child in tree.getChildren()" :tree="child" :current-node="currentNode"></BTree>
        </div>
      </template>
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
});

const bookTabs = computed(() => {
  return props.tree.getTabs()
})
const bookActiveTab = computed(() => {
  return bookTabs.value.find((tab) => shouldActive(tab))
})
const shouldActive = (node?: Node) => {
  if (node == undefined) node = props.tree

  return node.id == props.currentNode.id || props.currentNode.getParents().some((parent) => parent.id == node!.id);
};

let open = ref(shouldActive())

const toggle = () => {
  open.value = !open.value;
};
const setOpen = () => {
  open.value = true;
}
const setClosed = () => {
  open.value = false;
}
</script>
