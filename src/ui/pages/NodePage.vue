<template>
  <div class="pt-8">
    <div class="sticky top-12 z-50 flex w-full flex-grow">
      <NodeTab></NodeTab>
    </div>

    <div class="flex h-full w-full flex-col items-center">
      <div class="w-full mt-12">
        <div v-if="node.isChapter || node.isBook || node.isRoot" class="mt-24 flex flex-col items-center gap-12 justify-center">
          <Add :node="node" class="btn mx-auto flex w-72 flex-row items-center justify-center gap-4"></Add>
          <Tree :tree="node" :current-node="node" class="h-full overflow-scroll pb-24"></Tree>
        </div>

        <Tiptap :node="node" :saveCallback="save" :editable="editable" v-else></Tiptap>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NodeTab from "../components/NodeTab.vue";
import Tiptap from "../components/Tiptap.vue";
import Add from "../operators/Add.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCurrentNodeStore } from "../stores/NodeStore";
import NodeApi from "../api/NodeApi";
import Tree from "../components/Tree.vue";

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

.ProseMirror {
  @apply mb-24 px-2 pb-56 pt-1;
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
