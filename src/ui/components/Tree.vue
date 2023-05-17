<template>
  <div>
    <div tabindex="0" :class="{
      'flex': true,
      'flex-col': display == 'col',
      'flex-row dropdown dropdown-top relative': display == 'breadcrumbs',
      'flex-row p-1': display == 'row',
    }">

      <!-- 当前节点 -->
      <div v-show="isVisible" @mouseleave="handleLeave" @mouseenter="handleHover(tree)" :class="{
        'flex flex-row items-center p-0 text-xs hover:bg-primary-focus/20': true,
        'bg-primary text-primary-content': isActive && tree.isPage && display != 'breadcrumbs',
        'bg-primary/10': !tree.isPage && currentNode.id == tree.id && display != 'breadcrumbs',
        'border-l border-t border-b': display == 'row' && isChildrenVisible,
        'w-48': display == 'row',
      }">
        <Link :node="tree" @mouseenter="hoverCallback(tree)" :class="{
          'flex flex-grow cursor-pointer flex-row items-center gap-2 px-2 py-2': true,
          'font-bold text-opacity-50': !tree.isPage && display != 'breadcrumbs',
          'text-secondary': !tree.isVisible
        }">
        <IconChapter v-if="tree.isChapter || tree.isBook" class="h-4 w-4"></IconChapter>
        <IconDatabase v-if="tree.isRoot" class="h-4 w-4"></IconDatabase>
        <IconPage v-if="tree.isPage" class="h-4 w-4"></IconPage>

        {{ tree.title }}
        </Link>

        <!-- 面包屑模式的分割符号 -->
        <div v-if="!tree.isPage && display == 'breadcrumbs'" class="btn-ghost rounded-none btn-square btn-sm btn w-4">
          <IconRight></IconRight>
        </div>

        <!-- 折叠按钮 -->
        <div @click="handleToggleChildrenVisible" v-if="(!tree.isPage) && display == 'row'"
          class="btn-ghost rounded-none btn-square btn-sm btn">
          {{ isChildrenVisible ? "-" : "+" }}</div>

        <!-- 面包屑模式的弹出菜单 -->
        <ul id="dropdown-{{ tree.id }}" v-if="display == 'breadcrumbs' && isDropdownVisible" tabindex="0"
          class="absolute top-0 -translate-y-full flex flex-col py-6 px-4 shadow-2xl bg-base-300 rounded-t backdrop-filter backdrop-blur-sm max-h-96 overflow-y-scroll">
          <Children :list="siblings"></Children>
        </ul>
      </div>

      <!-- 子节点 -->
      <div :class="{
        'flex flex-col rounded-none': true,
        'pl-2': display != 'breadcrumbs',
        'border gap-0 border-l-0': display == 'row',
      }" v-if="isChildrenVisible">
        <Tree v-for="child in children" :root="root.isEmpty ? tree : root" :display="display" :tree="child" :hover-callback="hoverCallback"
          :current-node="currentNode"></Tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { EmptyNode, Node } from "../entities/Node";
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
    default: EmptyNode,
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
      // console.log('tree hovered', node.title)
    },
  }
});

/**
 * 初始化变量，页面加载完成后再更新变量的值
 */
let children = ref<Node[]>([])
let siblings = ref<Node[]>([])
let isActive = ref(false)
let isVisible = computed(() => props.display != 'breadcrumbs' || (props.display == 'breadcrumbs' && isActive.value))
let isChildrenForceVisible = ref(false)
let isChildrenVisible = computed(() => (children.value.length > 0 && isActive.value) || isChildrenForceVisible.value)
let isDropdownVisible = ref(false)

/**
 * 监听变化
 */
watch(props, () => {
  // console.log(`props发生变化`,props.currentNode.title)
  shouldActive(props.tree, props.currentNode).then(active => {
    // if (active) console.log(`更新当前节点:${props.tree.title}的active=true`)
    isActive.value = active
  })

  props.tree.getChildren().then(c => {
    children.value = c
  })
})

/**
 * 页面完成加载后，处理数据
 */
onMounted(() => {
  // 获取children，并更新相关数据
  props.tree.getChildren().then(c => {
    children.value = c
  })

  props.tree.getSiblings().then(s => {
    siblings.value = s
  })

  shouldActive(props.tree, props.currentNode).then(active => {
    // console.log(`更新当前节点:${props.tree.title}的active=${active}`)
    isActive.value = active
  })
})

/**
 * 处理页面事件
 */

let handleHover = (node: Node) => {
  isDropdownVisible.value = true
  props.hoverCallback(node)
}

let handleLeave = () => isDropdownVisible.value = false

let handleToggleChildrenVisible = () => isChildrenForceVisible.value = !isChildrenForceVisible.value;
</script>

<script lang="ts">
// 判断一个节点是否应该激活
async function shouldActive(target: Node, current: Node): Promise<boolean> {
  // console.log(`should [${target.id}]${target.title} be active while current is ${current.title}`)
  if (target.isRoot) return true
  if (target.id == current.id) return true
  if (target.isPage) return current.id == target.id;

  let parents = await current.getParents()

  return parents.some(parent => parent.id == target.id)
}
</script>
