<template>
  <aside>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full" v-if="!isWindows">
      <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <div v-if="route.name?.toString().startsWith('setting')">
      <ul class="menu  p-2 rounded-box">
        <li class="menu-title">
          <span>数据存储</span>
        </li>
        <li><a :class="{'active':route.name=='setting.database'}">数据仓库</a></li>
        <li><a>Item 2</a></li>
        <li class="menu-title">
          <span>个性化</span>
        </li>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
    <Tree v-else :tree="tree" :current-node="current!" name="aside-root" display="sidebar" :active-nodes="activeNodes"
      class="h-full w-full overflow-scroll pb-24"></Tree>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Preload from "../api/Preload";
import { useNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import componentLogger from '../log/componentLogger'
import { useRoute } from "vue-router";

componentLogger.info('「aside」加载侧栏')

/**
 * 定义变量，mounted后更新变量的值，实现不阻塞
 */
const nodeStore = useNodeStore();
const route = useRoute()
const isWindows = Preload.isWindows();
const activeNodes = computed(() => nodeStore.activeNodes)
const current = computed(() => nodeStore.current);
const hideTitleBar = false;
const tree = computed(() => nodeStore.tree);

// watch(
//   route,
//   () => {
//     nextTick(() => {
//       setTimeout(() => {
//         document.querySelector(`aside [data-id="${route.params.id}"]`)?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });
//       }, 500);
//     });
//   },
//   { immediate: true }
// );
</script>
