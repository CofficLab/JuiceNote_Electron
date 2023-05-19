<template>
  <div class="h-full">
    <!-- <div class="sticky top-12 z-50 flex w-full flex-grow">
      <NodeTab></NodeTab>
    </div> -->

    <div class="flex h-full w-full flex-col items-center pt-12">
      <div class="w-full flex justify-center items-center h-full flex-col gap-4" v-if="node.isEmpty">
        <NodeInfo :node="node" class="flex justify-center"></NodeInfo>
        <IconBlank class="w-24 text-primary/40 drop-shadow-2xl"></IconBlank>
      </div>

      <div class="w-full" v-else-if="node.isPage">
        <Tiptap :node="node" :saveCallback="save" :editable="editable"></Tiptap>
      </div>

      <div v-else class="container flex h-full flex-col justify-center gap-6">
        <NodeInfo :node="node" class="flex justify-center"></NodeInfo>
        <!-- <Tiptap :node="node" :saveCallback="save" :editable="editable"></Tiptap> -->
        <Tree :tree="node" display="grid" :hiddenList="[node.id]" :current-node="node"
          class="overflow-scroll pb-24 flex justify-center"></Tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tiptap from "../components/Tiptap.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCurrentNodeStore } from "../stores/NodeStore";
import NodeApi from "../api/NodeApi";
import Tree from "../components/Tree.vue";
import NodeInfo from "../components/NodeInfo.vue";
import IconBlank from "../icons/IconBlank.vue";

const route = useRoute();
const nodeStore = useCurrentNodeStore();
const editable = computed(() => route.name == "nodes.edit");
let node = computed(() => nodeStore.current);

let save = function (content: string) {
  if (content != node.value.content) {
    console.log("保存节点", node.value.id, "的内容", content.substring(0, 20) + "...");
    NodeApi.updateContent(node.value.id, content);
  }
};

watch(route, () => {
  if (route.name != "nodes.show" && route.name != "nodes.edit") return;

  if (route.hash.length > 0) {
    // 获取带有锚点的元素
    var target = document.querySelector<HTMLDivElement>(route.hash);
    // console.log("滚动到锚点", target);

    // 如果有锚点并且目标元素存在，则滚动到该元素
    if (window.location.hash && target) {
      document.querySelector("main")!.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
});
</script>

<style lang="postcss">
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-yellow-300/30 shadow-2xl;
}

table {
  @apply rounded-none;

  td,
  th {
    @apply border border-gray-700 p-2 !important;
  }

  p {
    @apply my-0 !important;
  }
}
</style>
