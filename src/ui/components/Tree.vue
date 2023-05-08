<template>
  <div>
    <div tabindex="0" :class="{
      'flex': true,
      'flex-col': display == 'col',
      'flex-row dropdown dropdown-top relative': display == 'breadcrumbs',
      'flex-row p-1': display == 'row',
    }">

      <!-- 当前节点 -->
      <div v-show="shouldShow" @mouseleave="handleLeave(tree)" @mouseenter="handleHover(tree)" :class="{
        'flex flex-row items-center p-0 text-xs hover:bg-primary-focus/20': true,
        'bg-primary text-primary-content': tree.shouldActive(currentNode) && tree.isPage && display != 'breadcrumbs',
        'bg-primary/5': tree.shouldActive(currentNode) && tree.isChapter && !tree.isTab && display != 'breadcrumbs',
        'border-l border-t border-b': display == 'row' && open,
        'w-48': display == 'row',
      }">
        <Link :node="tree" @click="setOpen" @mouseenter="hoverCallback(tree)" :class="{
          'flex flex-grow cursor-pointer flex-row items-center gap-2 px-2 py-2': true,
          'font-bold text-opacity-50': !tree.isPage && display != 'breadcrumbs',
          'text-secondary': !tree.isVisible
        }">
        <IconBook v-if="tree.isBook" class="h-4 w-4"></IconBook>
        <IconChapter v-if="tree.isChapter" class="h-4 w-4"></IconChapter>
        <IconDatabase v-if="tree.id == 0" class="h-4 w-4"></IconDatabase>
        <IconPage v-if="tree.isPage" class="h-4 w-4"></IconPage>

        {{ tree.title }}
        </Link>

        <!-- 面包屑模式的分割符号 -->
        <div v-if="!tree.isPage && display == 'breadcrumbs'" class="btn-ghost rounded-none btn-square btn-sm btn w-4">
          <IconRight></IconRight>
        </div>

        <!-- 折叠按钮 -->
        <div @click="toggle" v-if="(!tree.isPage) && display == 'row'"
          class="btn-ghost rounded-none btn-square btn-sm btn">
          {{ open ? "-" : "+" }}</div>

        <!-- 面包屑模式的弹出菜单 -->
        <ul id="dropdown-{{ tree.id }}" v-if="display == 'breadcrumbs' && shouldShowDropdown" tabindex="0"
          class="absolute top-0 -translate-y-full flex flex-col py-6 px-4 shadow-2xl bg-base-300 rounded-t backdrop-filter backdrop-blur-sm max-h-96 overflow-y-scroll">
          <Children :list="tree.getSiblings()"></Children>
        </ul>
      </div>

      <!-- 子节点 -->
      <div :class="{
        'flex flex-col rounded-none': true,
        'pl-2': display != 'breadcrumbs',
        'border gap-0 border-l-0': display == 'row',
      }" v-if="shouldChildrenShow">
        <Tree v-for="child in tree.getChildren()" :root="root.isEmpty ? tree : root" :display="display" :tree="child" :hover-callback="hoverCallback"
          :current-node="currentNode"></Tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref,watch } from "vue";
import { EmptyNode, Node, DatabaseNode } from "../entities/Node";
import IconPage from "../icons/IconPage.vue";
import IconChapter from "../icons/IconChapter.vue";
import IconDatabase from "../icons/IconDatabase.vue";
import IconBook from "../icons/IconBook.vue";
import IconRight from '../icons/IconRight.vue'
import Link from "../components/Link.vue";
import Children from "../components/Children.vue";

const props = defineProps({
  tree: {
    type: Node,
    default: DatabaseNode,
  },
  root: {
    type: Node,
    default: EmptyNode,
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
    validator(value: string) {
      return ['col', 'row', 'breadcrumbs'].includes(value)
    },
  },
  hoverCallback: {
    type: Function,
    default: (node: Node) => {
      console.log('tree hovered', node.title)
    },
  }
});

const shouldShow = computed(() => {
  if (props.display == 'breadcrumbs') {
    return props.tree.shouldActive(props.currentNode)
  }

  return !props.hiddenList.includes(props.tree.id) && props.tree.getParents().length < props.depth
})

const shouldShowDropdown = ref(false)

const shouldChildrenShow = computed(() => {
  if (props.display == 'breadcrumbs') {
    return shouldShow.value
  }

  return (props.tree.getChildren().length > 0 && open.value) || shouldHide.value
})

const shouldHide = computed(() => {
  return props.hiddenList.includes(props.tree.id)
})

let open = ref(props.tree.shouldActive(props.currentNode))

const toggle = () => {
  open.value = !open.value;
};
const setOpen = () => {
  open.value = true;
}

const handleHover = (node: Node) => {
  shouldShowDropdown.value = true
  props.hoverCallback(node)
}

const handleLeave = (node: Node) => {
  shouldShowDropdown.value = false
}
</script>
