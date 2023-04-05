<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <NodeTab :current="current"></NodeTab>

    <!-- 编辑框 -->
    <div id="editor-container" @contextmenu.prevent="showRightMenu">
      <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose h-screen w-full overflow-visible xl:prose-lg lg:mr-56" />
    </div>

    <!-- 右键菜单 -->
    <RightMenu :event="rightClickEvent">
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
    </RightMenu>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import RightMenu from "../components/RightMenu.vue";
import Copy from "../operators/Copy.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";
import { onBeforeUnmount, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import NodeTab from "../components/NodeTab.vue";

const route = useRoute();

let rightClickEvent = ref(null);
let sourceCodeDisplay = ref(false);
let current = Node.find(route.params.id);
let editor = new Editor({
  extensions: Extensions,
  editable: false,
  content: current.getContent(),
});

let showRightMenu = function (event) {
  rightClickEvent.value = event;
};

onBeforeRouteUpdate((to, from) => {
  console.log("路由发生了变化，处理lesson的展示", from.fullPath, to.fullPath);

  // 更新当前节点
  current = NodeController.getNodeById(to.params.id);
  // 更新内容
  editor.commands.setContent(current.getContent(), true);

  // 如果有锚点并且目标元素存在，则滚动到该元素
  if (to.hash.length > 0) {
    var target = document.querySelector(to.hash);
    if (window.location.hash && target) {
      document.querySelector("#editor-container").scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
});

onBeforeUnmount(() => {
  editor.destroy();
});
</script>

<style lang="postcss">
#editor-container {
  @apply mt-1 flex w-full justify-center overflow-auto border-0 p-4;
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
