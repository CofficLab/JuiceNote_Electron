<template>
  <div class="mt-8 z-50">
    <div class="fixed top-9 z-50 flex w-full flex-grow pr-40">
      <NodeTab :current="node"></NodeTab>
    </div>

    <div class="flex h-full w-full flex-col items-center">
      <div class="z-40 w-full" :class="{ 'mt-12': node.getParent().isTab }">
        <Add :node="node" class="flex justify-center flex-row btn w-72 mx-auto items-center gap-4"  v-if="node.isChapter"></Add>

        <Editor :node="node" :saveCallback="save" :editable="editable" v-else></Editor>
      </div>
    </div>
  </div>
</template>

<script setup>
import NodeTab from "../components/NodeTab.vue";
import Editor from "../components/Editor.vue";
import Add from "../operators/Add.vue"
import { Node } from "../../models/Node";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const editable = computed(() => route.name == "lessons.edit");

let adding = route.query.adding != undefined;
let renaming = route.query.renaming != undefined;
let node = Node.find(route.params.id);

let save = function (content) {
  if (content != node.content) {
    console.log("保存节点", node.id, "的内容", content.substring(0, 20) + "...");
    node.updateContent(content);
  }
};

watch(route, () => {
  node = Node.find(route.params.id);
  adding = route.query.adding != undefined;
  renaming = route.query.renaming != undefined;

  if (route.hash.length > 0) {
    // 获取带有锚点的元素
    var target = document.querySelector(route.hash);
    console.log("滚动到锚点", target);

    // 如果有锚点并且目标元素存在，则滚动到该元素
    if (window.location.hash && target) {
      document.querySelector("main").scrollTo({
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
