<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container">
      <Toolbar :editor="editor" :current="current" :source-code-callback="toggleSourceCode"></Toolbar>
    </div>

    <NodeTab :current="current"></NodeTab>

    <!-- 编辑框 -->
    <div id="editor-container" @contextmenu.prevent="showRightMenu">
      <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose h-screen w-full overflow-visible xl:prose-lg lg:mr-56" />
    </div>

    <!-- 源码 -->
    <div class="container">
      <Monaco :keyUpCallback="save" v-if="sourceCodeDisplay" :code="code" language="html" :readOnly="false" :showLineNumbers="true"></Monaco>
    </div>

    <!-- 右键菜单 -->
    <RightMenu :event="rightClickEvent">
      <Edit :node="current"></Edit>
      <Rename :node="current"></Rename>
      <CreateChild :node="current"></CreateChild>
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
      <Delete></Delete>
    </RightMenu>

    <!-- 弹层 -->
    <Add :node="current" v-if="adding"></Add>
    <RenameModal :node="current" v-if="renaming"></RenameModal>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import NodeTab from "../components/NodeTab.vue";
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
import Delete from "../operators/Delete.vue";
import Monaco from "../components/Monaco.vue";
import { Node } from "../../models/Node";
import Add from "../modals/Add.vue";
import { computed, onBeforeUnmount, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

console.log("编辑模式");

const route = useRoute();

let adding = route.query.adding != undefined;
let renaming = route.query.renaming != undefined;

let rightClickEvent = ref(null);
let code = ref("");
let sourceCodeDisplay = ref(false);
let node = null;
let current = computed(() => Node.find(route.params.id));

let showRightMenu = function (event) {
  rightClickEvent.value = event;
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
  injectCSS: true,
  enableInputRules: true,
  enablePasteRules: false,
  parseOptions: {
    preserveWhitespace: "full",
  },
  onCreate: () => {
    node = current.value;
    editor.commands.setContent(node.getContent() == "" ? "「空」" : node.getContent(), false);
    code.value = editor.getHTML();
  },
  onUpdate: (event) => {
    save();
  },
});

onBeforeUnmount(() => {
  editor.destroy();
});

onBeforeRouteUpdate((to, from) => {
  console.log("路由发生了变化，处理lesson的展示", from.fullPath, to.fullPath);

  // 更新当前节点
  node.value = NodeController.getNodeById(to.params.id);
  // 更新内容
  editor.commands.setContent(node.value.getContent(), true);
  // 更新是否可编辑
  editor.setEditable(to.query.editable == 1, false);
  // 是否显示添加的模态框
  adding = to.query.adding != undefined;

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
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-yellow-300/30 shadow-2xl;
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
