<template>
  <div>
    <div :class="{
      'flex': true,
      'flex-col': display == 'col',
      'flex-row p-1': display == 'row',
    }">
      <div v-show="shouldShow" @mouseenter="hoverCallback(tree)" :class="{
        'flex flex-row items-center p-0 text-xs': true,
        'hover:bg-primary-focus/20': !shouldActive() || tree.isDatabase,
        'bg-primary text-primary-content': shouldActive() && (tree.isPage || tree.isTab),
        'bg-primary/5': shouldActive() && tree.isChapter && !tree.isTab,
        'w-48': display == 'row',
        'border-l border-t border-b border-accent-content': display == 'row' && open,
      }">
        <Link :node="tree" @click="setOpen" @mouseenter="hoverCallback(tree)" :class="{
          'flex flex-grow cursor-pointer flex-row items-center gap-2 px-2 py-2': true,
          'font-bold text-opacity-50': tree.isChapter && !tree.isTab,
          'text-secondary': !tree.isVisible
        }">
        <IconBook v-if="tree.isBook" class="h-4 w-4"></IconBook>
        <IconChapter v-if="tree.isChapter && !tree.isTab" class="h-4 w-4"></IconChapter>
        <IconDatabase v-if="tree.id == 0" class="h-4 w-4"></IconDatabase>
        <IconPage v-if="tree.isPage || tree.isTab" class="h-4 w-4"></IconPage>

        {{ tree.title }}
        </Link>

        <!-- 折叠按钮 -->
        <div @click="toggle" v-if="(tree.isChapter) || tree.isBook" class="btn-ghost rounded-none btn-square btn-sm btn">
          {{
            open ? "-" : "+" }}</div>
      </div>

      <!-- 子节点 -->
      <div :class="{
        'flex flex-col rounded-none pl-2': true,
        'border border-accent-content gap-0 border-l-0': display == 'row',
      }" v-if="(tree.getChildren().length > 0 && open) || shouldHide">
        <BTree v-for="child in tree.getChildren()" :display="display" :tree="child" :hover-callback="hoverCallback"
          :current-node="currentNode"></BTree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { EmptyNode, Node, DatabaseNode } from "../entities/Node";
import IconPage from "../icons/IconPage.vue";
import IconChapter from "../icons/IconChapter.vue";
import IconDatabase from "../icons/IconDatabase.vue";
import IconBook from "../icons/IconBook.vue";
import Link from "../components/Link.vue";

const props = defineProps({
  tree: {
    type: Node,
    default: DatabaseNode,
  },
  currentNode: {
    type: Node,
    default: EmptyNode,
  },
  hiddenList: {
    type: Array,
    default: () => [],
  },
  depth: {
    type: Number,
    default: Infinity,
  },
  display: {
    type: String,
    default: "col",
  },
  hoverCallback: {
    type: Function,
    default: (node: Node) => {
      console.log('tree hovered', node.title)
    },
  }
});

const shouldShow = computed(() => {
  return !props.hiddenList.includes(props.tree.id) && props.tree.getParents().length < props.depth
})

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
