<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container" v-if="editor && editable">
      <Toolbar :editor="editor" :current="current" :source-code-callback="toggleSourceCode"></Toolbar>
    </div>

    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" class="tab tab-lifted" :node="sibling">{{ sibling.title }}</Link>
    </div>

    <!-- 编辑框 -->
    <div id="editor-container" @contextmenu.prevent="showRightMenu">
      <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose h-screen w-full overflow-visible xl:prose-lg" :class="{ 'lg:mr-56': hasToc }" />
    </div>

    <!-- 源码 -->
    <div class="container">
      <Monaco :keyUpCallback="save" v-if="sourceCodeDisplay" :code="code" language="html" :readOnly="false" :showLineNumbers="true"></Monaco>
    </div>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" :event="rightClickEvent">
      <Edit :node="current"></Edit>
      <Rename :node="current"></Rename>
      <CreateChild :node="current"></CreateChild>
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
      <Delete></Delete>
    </RightMenu>

    <!-- 弹层 -->
    <Add></Add>
    <RenameModal></RenameModal>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import Link from "../components/Link.vue";
import RightMenu from "../components/RightMenu.vue";
import Toolbar from "../blocks/Toolbar.vue";
import CreateChild from "../operators/CreateChild.vue";
import Copy from "../operators/Copy.vue";
import Edit from "../operators/Edit.vue";
import Rename from "../operators/Rename.vue";
import RenameModal from "../modals/Rename.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import NodeController from "../../controllers/NodeController";
import RightMenuController from "../../controllers/RightMenuController";
import Delete from "../operators/Delete.vue";
import Monaco from "../components/Monaco.vue";
import { Node } from "../../models/Node";
import Add from "../modals/Add.vue";
import { computed, watch, onBeforeUnmount, ref, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();
let rightClickEvent = null;
let hasToc = false;
let code = ref("");
let sourceCodeDisplay = ref(false);
let node = null;
let editable = computed(() => route.query.editable == 1);
let shouldShowRightMenu = computed(() => RightMenuController.shouldShow && this.rightClickEvent);
let current = computed(() => Node.find(route.params.id));

let showRightMenu = function (event) {
  rightClickEvent = event;
  RightMenuController.show();
};
let checkToc = function () {
  hasToc = editor.getHTML().startsWith("<toc></toc>");
};
let toggleSourceCode = function () {
  sourceCodeDisplay.value = !sourceCodeDisplay.value;
};
let save = function (content) {
  if (content == undefined) {
    content = editor.getHTML();
  }

  if (content != node.content) {
    console.log("保存节点", node.id, "的内容", content.substring(0, 20) + "...");
    node.updateContent(content);
    code.value = content;
    editor.commands.setContent(content, false);
  }
};

let editor = new Editor({
  extensions: Extensions,
  autofocus: true,
  editable: editable.value,
  injectCSS: true,
  enableInputRules: true,
  enablePasteRules: false,
  parseOptions: {
    preserveWhitespace: "full",
  },
  onCreate: () => {
    node = current.value;
    editor.commands.setContent(node.getContent() == "" ? "「空」" : node.getContent(), false);
    checkToc();
    code.value = editor.getHTML();

    console.log("lesson page created,hash is", route.hash);

    if (route.hash.length > 0) {
      // 获取带有锚点的元素
      var target = document.querySelector(route.hash);

      // // 如果有锚点并且目标元素存在，则滚动到该元素
      if (window.location.hash && target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  },
  onUpdate: (event) => {
    if (!editable) return;

    save();
    checkToc();

    console.log("lesson page updated,hash is", route.hash);

    if (route.hash.length > 0) {
      // 获取带有锚点的元素
      var target = document.querySelector(route.hash);

      // // 如果有锚点并且目标元素存在，则滚动到该元素
      if (window.location.hash && target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  },
});

document.addEventListener("click", () => {
  rightClickEvent = null;
});

onBeforeUnmount(() => {
  editor.destroy();
});

onBeforeRouteUpdate((to, from) => {
  if (from.query.editable == 1) save();

  // 更新当前节点
  node.value = NodeController.getNodeById(to.params.id);
  // 更新内容
  editor.commands.setContent(node.value.getContent(), true);
  // 更新是否可编辑
  editor.setEditable(to.query.editable == 1, false);
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
