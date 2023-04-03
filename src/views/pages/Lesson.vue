<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container" v-if="editor && editable">
      <Toolbar :editor="editor" :current="current" :source-code-callback="toggleSourceCode"></Toolbar>
    </div>

    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" class="tab-lifted tab" :node="sibling">{{ sibling.title }}</Link>
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
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import RightMenuController from "../../controllers/RightMenuController";
import NodeController from "../../controllers/NodeController";
import Delete from "../operators/Delete.vue";
import Monaco from "../components/Monaco.vue";
import { Node } from "../../models/Node";
import { computed, watch, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";

let rightClickEvent = null;
let hasToc = false;
let code = ref("");
let sourceCodeDisplay = ref(false);
let node = null;
let route = useRoute();
let editable = computed(() => NodeController.getEditable());
let shouldShowRightMenu = computed(() => RightMenuController.shouldShow && this.rightClickEvent);
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
  },
  onUpdate: (event) => {
    if (!editable) return;

    console.log("editor updated,save content and check toc");
    save();
    checkToc();
  },
});

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

document.addEventListener("click", () => {
  rightClickEvent = null;
});

watch(current, () => {
  console.log("current changed, update editor content");
  if (editable.value) save();
  node.value = current.value;
  editor.commands.setContent(node.value.getContent(), true);
});

watch(editable, () => {
  editor.setEditable(editable.value, false);
});

onBeforeUnmount(() => {
  editor.destroy();
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
