<template>
  <div>
    <div tabindex="0" :class="{
      'flex': true,
      'flex-col': display == 'sidebar',
      'flex-row dropdown dropdown-top relative h-full': display == 'breadcrumbs',
      'flex-row p-1': display == 'row',
    }">

      <!-- 当前节点 -->
      <div v-show="isVisible" @mouseleave="handleLeave" @mouseenter="handleHover(tree)" :class="{
        // 通用
        'flex flex-row items-center p-0': true,

        // 字体
        'text-sm': display == 'row' || display == 'grid',
        'text-xs': display == 'breadcrumbs' || display == 'sidebar',

        // shadow
        'drop-shadow-lg': display == 'grid',

        // rounded
        'rounded-md': display == 'grid',

        // 宽度
        'w-48': display == 'row',
        'w-24': display == 'grid',

        // 颜色
        'bg-primary text-primary-content': isActive && tree.isPage && children.length == 0 && display != 'breadcrumbs',
        'bg-primary/50': (!tree.isPage || children.length > 0) && currentNode.id == tree.id && display != 'breadcrumbs',
        'bg-primary/70': tree.isRoot && currentNode.id == tree.id && display != 'breadcrumbs',

        // boder
        'border-l border-t border-b': display == 'row' && isChildrenVisible,
      }">
        <Link :node="tree" @mouseenter="hoverCallback(tree)" :class="{
          'flex flex-grow cursor-pointer flex-row h-full items-center gap-2 px-2 py-2 tree-item  hover:bg-primary-focus/20': true,
          'flex-col': display == 'grid',
          'font-bold text-opacity-50': !tree.isPage && display != 'breadcrumbs',
          'text-secondary': !tree.isVisible
        }">

        <!-- 图标 -->
        <IconDatabase v-if="tree.isRoot" :class="display == 'grid' ? 'icon-lg' : 'icon-sm'"></IconDatabase>
        <IconChapter v-else-if="tree.isChapter || tree.isBook || children.length > 0" :solid="display == 'grid'"
          :class="display == 'grid' ? 'icon-lg' : 'icon-sm'"></IconChapter>
        <IconPage v-else-if="tree.isPage && children.length == 0" :class="display == 'grid' ? 'icon-lg' : 'icon-sm'">
        </IconPage>

        {{ tree.title }}
        </Link>

        <!-- 面包屑模式的分割符号 -->
        <div v-if="!tree.isPage && display == 'breadcrumbs' && tree.id != currentNode.id"
          class="btn-ghost rounded-none h-full flex items-center">
          <IconRight class="w-3"></IconRight>
        </div>

        <!-- 折叠按钮 -->
        <div @click="handleToggleChildrenVisible" v-if="(!tree.isPage) && display == 'row'"
          class="btn-ghost rounded-none btn-square btn-sm btn">
          {{ isChildrenVisible ? "-" : "+" }}</div>

        <!-- 面包屑模式的弹出菜单 -->
        <ul id="dropdown-{{ tree.id }}" v-if="display == 'breadcrumbs' && isDropdownVisible && children.length > 0" tabindex="0"
          class="absolute top-0 -translate-y-full flex flex-col py-6 w-48 max-w-max px-4 shadow-2xl bg-primary/50 rounded-t backdrop-blur-sm  backdrop-filter  max-h-96 overflow-y-scroll">
          <Children :list="children"></Children>
        </ul>
      </div>

      <!-- 子节点 -->
      <div :class="{
        'flex rounded-none': true,
        'pl-2': display != 'breadcrumbs',
        'flex-col': display == 'sidebar',
        'border gap-0 border-l-0 flex-col': display == 'row',

        // 布局
        'grid grid-flow-row grid-cols-6': display == 'grid' && children.length >= 6,
        'flex flex-row justify-center': display == 'grid' && children.length < 6
      }" v-if="isChildrenVisible">
        <Tree v-for="child in children" :name="props.name + '-' + child.title" :root="root.isEmpty ? tree : root"
          :display="display" :tree="child" :hover-callback="hoverCallback" :active-nodes="activeNodes"
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
    default: "sidebar",
    validator(value: string) {
      return ['row', 'breadcrumbs', 'grid', 'sidebar'].includes(value)
    },
  },
  hoverCallback: {
    type: Function,
    default: (node: Node) => {
      // console.log('tree hovered', node.title)
    },
  },
  name: {
    type: String,
    default: '未定义',
  }
});

log(`首次加载`)

/**
 * 初始化变量，页面加载完成后再更新变量的值
 */
let children = ref<Node[]>([])
let siblings = ref<Node[]>([])
let isActive = computed(() => {
  let result = props.activeNodes.map(node => node.id).includes(props.tree.id)
  // log(`激活`,result,`当前激活的节点是`,props.activeNodes.map(node => node.title))
  return result
})
let isVisible = computed(() => {
  // log(`判断是否可见`)
  if (props.hiddenList.includes(props.tree.id)) return false
  if (props.display == 'breadcrumbs' && isActive.value) return true

  return props.display != 'breadcrumbs'
})
let isChildrenForceVisible = ref(false)
let isChildrenVisible = computed(() => {
  let result = (children.value.length > 0 && isActive.value) || isChildrenForceVisible.value
  // log(`判断子节点是否可见`,result)
  return result
})
let isDropdownVisible = ref(false)

watch(() => props.tree.updatedAt, () => {
  log(`的 props.tree 发生变化 -> ${props.tree.updatedAt}`)

  if (isVisible.value) updateChildren()
})

/**
 * 页面完成加载后，处理数据
 */
onMounted(() => {
  // 获取children，并更新相关数据
  if (isVisible && children.value.length == 0) {
    updateChildren()
  }

  props.tree.getSiblings().then(s => {
    siblings.value = s
  })
})

/**
 * 处理页面事件
 */

let handleHover = (node: Node) => {
  isDropdownVisible.value = siblings.value.length > 0
  props.hoverCallback(node)
}

let handleLeave = () => isDropdownVisible.value = false

let handleToggleChildrenVisible = () => isChildrenForceVisible.value = !isChildrenForceVisible.value;

function log(...args: any[]) {
  componentLogger.info(`「${props.name}」`, ...args)
}

function updateChildren() {
  log(`更新子节点`)
  props.tree.getChildren().then(c => {
    children.value = c
  })
}
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
