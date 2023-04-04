<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" class="tab tab-lifted" :node="sibling">{{ sibling.title }}</Link>
    </div>

    <!-- 编辑框 -->
    <div id="editor-container" @contextmenu.prevent="showRightMenu">
      <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose h-screen w-full overflow-visible xl:prose-lg" :class="{ 'lg:mr-56': hasToc }" />
    </div>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" :event="rightClickEvent">
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
    </RightMenu>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import Link from "../components/Link.vue";
import RightMenu from "../components/RightMenu.vue";
import Copy from "../operators/Copy.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import NodeController from "../../controllers/NodeController";
import RightMenuController from "../../controllers/RightMenuController";
import { Node } from "../../models/Node";
import { computed, onBeforeUnmount, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();

let rightClickEvent = null;
let hasToc = false;
let code = ref("");
let sourceCodeDisplay = ref(false);
let node = null;
let shouldShowRightMenu = computed(() => RightMenuController.shouldShow && rightClickEvent);
let current = computed(() => Node.find(route.params.id));

let showRightMenu = function (event) {
  rightClickEvent = event;
  RightMenuController.show();
};
let checkToc = function () {
  hasToc = editor.getHTML().startsWith("<toc></toc>");
};

let editor = new Editor({
  extensions: Extensions,
  autofocus: true,
  editable: false,
  injectCSS: true,
  enableInputRules: true,
  enablePasteRules: false,
  parseOptions: {
    preserveWhitespace: "full",
  },
  onCreate: () => {
    node = current.value;
    editor.commands.setContent(node.getContent(), false);
    checkToc();
    code.value = editor.getHTML();
  },
  onUpdate: (event) => {
    checkToc();
  },
});

document.addEventListener("click", () => {
  rightClickEvent = null;
});

onBeforeUnmount(() => {
  editor.destroy();
});

onBeforeRouteUpdate((to, from) => {
  console.log("路由发生了变化，处理lesson的展示", from.fullPath, to.fullPath);

  // 更新当前节点
  node.value = NodeController.getNodeById(to.params.id);
  // 更新内容
  editor.commands.setContent(node.value.getContent(), false);
  // 检查TOC
  checkToc();

  if (to.hash.length > 0) {
    // 获取带有锚点的元素
    var target = document.querySelector(to.hash);
    console.log("滚动到锚点", target);

    // 如果有锚点并且目标元素存在，则滚动到该元素
    if (window.location.hash && target) {
      document.querySelector("#editor-container").scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
});
</script>

<style lang="postcss">
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/10 shadow-2xl;
}

#tabs-container {
  @apply tabs mt-0 flex w-full justify-center bg-yellow-400/10;
}

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
