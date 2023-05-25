<template>
  <aside>
    <!-- 空白，用于拖动 -->
    <div class="sticky top-0 z-40 w-full bg-primary/10" v-if="!isWindows">
      <div class="draggable" :class="{ 'h-10': !hideTitleBar, 'h-0': hideTitleBar }"></div>
    </div>

    <!-- <div v-if="root.isEmpty" class=" flex flex-col gap-4">
      <div class="alert alert-info shadow-lg rounded-none">
        <div>
          <IconInfo></IconInfo>
          <span>仓库为空</span>
        </div>
      </div>
    </div> -->
    <Tree :tree="root" :current-node="current!" name="aside-root" :active-nodes="activeNodes" class="h-full w-full overflow-scroll pb-24"></Tree>
  </aside>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import Preload from "../api/Preload";
import { useNodeStore } from "../stores/NodeStore";
import Tree from "../components/Tree.vue";
import componentLogger from '../log/componentLogger'

componentLogger.info('「aside」加载侧栏')

/**
 * 定义变量，mounted后更新变量的值，实现不阻塞
 */
const nodeStore = useNodeStore();
const isWindows = Preload.isWindows();
const activeNodes = computed(() => nodeStore.activeNodes)
const current = computed(() =>  nodeStore.current);
const hideTitleBar = false;
const root = nodeStore.root

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
