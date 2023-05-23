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
        // 通用
        'flex flex-row items-center p-0 text-xs hover:bg-primary-focus/20': true,

        // shadow
        'drop-shadow-lg': display == 'grid',

        // rounded
        'rounded-md': display == 'grid',

        // 宽度
        'w-48': display == 'row',
        'w-24': display == 'grid',

        // 颜色
        'bg-primary text-primary-content': isActive && tree.isPage && display != 'breadcrumbs',
        'bg-primary/50': !tree.isPage && currentNode.id == tree.id && display != 'breadcrumbs',
        'bg-primary/70': tree.isRoot && currentNode.id == tree.id && display != 'breadcrumbs',

        // boder
        'border-l border-t border-b': display == 'row' && isChildrenVisible,
      }">
        <Link :node="tree" @mouseenter="hoverCallback(tree)" :class="{
          'flex flex-grow cursor-pointer flex-row items-center gap-2 px-2 py-2 tree-item': true,
          'flex-col': display == 'grid',
          'font-bold text-opacity-50': !tree.isPage && display != 'breadcrumbs',
          'text-secondary': !tree.isVisible
        }">
        <IconChapter v-if="tree.isChapter || tree.isBook" :solid="display == 'grid'"
          :class="display == 'grid' ? 'icon-lg' : 'icon-sm'"></IconChapter>
        <IconDatabase v-if="tree.isRoot" :class="display == 'grid' ? 'icon-lg' : 'icon-sm'"></IconDatabase>
        <IconPage v-if="tree.isPage" :class="display == 'grid' ? 'icon-lg' : 'icon-sm'"></IconPage>

        {{ tree.title }}
        </Link>

        <!-- 面包屑模式的分割符号 -->
        <div v-if="!tree.isPage && display == 'breadcrumbs' && tree.id != currentNode.id"
          class="btn-ghost rounded-none btn-square btn-sm btn w-4">
          <IconRight></IconRight>
        </div>

        <!-- 折叠按钮 -->
        <div @click="handleToggleChildrenVisible" v-if="(!tree.isPage) && display == 'row'"
          class="btn-ghost rounded-none btn-square btn-sm btn">
          {{ isChildrenVisible ? "-" : "+" }}</div>

        <!-- 面包屑模式的弹出菜单 -->
        <ul id="dropdown-{{ tree.id }}" v-if="display == 'breadcrumbs' && isDropdownVisible" tabindex="0"
          class="absolute top-0 -translate-y-full flex flex-col py-6 w-48 max-w-max px-4 shadow-2xl bg-primary/50 rounded-t backdrop-blur-sm  backdrop-filter  max-h-96 overflow-y-scroll">
          <Children :list="siblings"></Children>
        </ul>
      </div>

      <!-- 子节点 -->
      <div :class="{
        'flex rounded-none': true,
        'pl-2': display != 'breadcrumbs',
        'flex-col': display == 'col',
        'border gap-0 border-l-0 flex-col': display == 'row',
        // 排列
        'grid grid-flow-row grid-cols-6': display == 'grid' && children.length >= 6,
        'flex flex-row justify-center': display == 'grid' && children.length < 6

      }" v-if="isChildrenVisible">
        <Tree v-for="child in children" :root="root.isEmpty ? tree : root" :display="display" :tree="child"
          :hover-callback="hoverCallback" :active-nodes="activeNodes" :current-node="currentNode"></Tree>
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
import IconRight from '../icons/IconRight.vue'
import Link from "../components/Link.vue";
import Children from "../components/Children.vue";
import componentLogger from "../log/componentLogger";

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
  activeNodes: {
    type: Array<Node>,
    default: () => [],
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
      return ['col', 'row', 'breadcrumbs', 'grid'].includes(value)
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
let isActive = computed(() => {
  componentLogger.info('判断节点是否激活', props.tree.title)
  return props.activeNodes.map(node => node.id).includes(props.tree.id)
})
let isVisible = computed(() => {
  if (props.hiddenList.includes(props.tree.id)) return false
  if (props.display == 'breadcrumbs' && isActive.value) return true

  return props.display != 'breadcrumbs'
})
let isChildrenForceVisible = ref(false)
let isChildrenVisible = computed(() => {
  return (children.value.length > 0 && isActive.value) || isChildrenForceVisible.value
})
let isDropdownVisible = ref(false)

function updateChildren() {
  componentLogger.info('更新children', props.tree.title)
  props.tree.getChildren().then(c => {
    children.value = c
  })
}

watch(() => props.tree.id, () => {
  componentLogger.info(`props.tree 发生变化，现在是：`, props.tree.title)

  if (isVisible) updateChildren()
})

/**
 * 页面完成加载后，处理数据
 */
// onMounted(() => {
  // componentLogger.info('tree mounted', props.tree.title)
  // 获取children，并更新相关数据
  if (isVisible) updateChildren()

  props.tree.getSiblings().then(s => {
    siblings.value = s
  })
// })

/**
 * 处理页面事件
 */

let handleHover = (node: Node) => {
  isDropdownVisible.value = siblings.value.length > 0
  props.hoverCallback(node)
}

let handleLeave = () => isDropdownVisible.value = false

let handleToggleChildrenVisible = () => isChildrenForceVisible.value = !isChildrenForceVisible.value;
</script>

<style lang="postcss">
.tree-item {
  .icon-sm {
    @apply h-4 w-4
  }

  .icon-lg {
    @apply h-16 w-16 text-primary
  }
}
</style>
