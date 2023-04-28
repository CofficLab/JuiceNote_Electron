<template>
  <!-- 工具栏 -->
  <div v-if="editable" class="fixed top-0 left-0 z-40 flex justify-center w-full pl-24 draggable bg-yellow-500/80 dark:bg-yellow-900/40 lg:pl-40">
    <Toolbar :editor="editor" :current="node"></Toolbar>
  </div>

  <!-- 编辑框 -->
  <div class="z-30 flex flex-row justify-center w-full px-4 border-0">
    <editor-content :editor="editor" class="w-full prose xl:prose-lg lg:mr-56" />
  </div>
</template>

<script setup>
import Extensions from "../entities/Extensions";

import { ref, watch, onBeforeUnmount } from "vue";
import Toolbar from "../layouts/Toolbar.vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Node from "../entities/Node";

const props = defineProps({
  node: Node,
  editable: Boolean,
  saveCallback: null,
});

let code = ref(props.node.getContent());

let getEditor = () =>
  new Editor({
    extensions: Extensions,
    content: props.node.getContent(),
    autofocus: props.editable ? 1 : true,
    injectCSS: true,
    enableInputRules: true,
    enablePasteRules: false,
    editable: props.editable,
    parseOptions: {
      preserveWhitespace: "full",
    },
    cursor: {
      color: "blue",
      background: "blue",
      width: 2,
      "border-left-width": 2,
      "border-left-style": "solid",
    },
    onCreate: (event) => {
      // event.editor.commands.focus(1);
    },
    onUpdate: (event) => {
      props.saveCallback && props.saveCallback(event.editor.getHTML());
      code.value = event.editor.getHTML();
    },
  });

let editor = getEditor();

watch(props, () => {
  // console.log("editor 发现 props 发生变化，更新内容");
  editor.destroy();
  editor = getEditor();
});

onBeforeUnmount(() => {
  console.log("销毁TipTap Editor");
  editor.destroy();
});
</script>

<style lang="postcss">
.ProseMirror {
  @apply mb-24 px-2 pb-56 pt-1 caret-red-900;
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
