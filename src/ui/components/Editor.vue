<template>
  <!-- 工具栏 -->
  <div v-if="editable" class="fixed left-0 top-0 z-40 flex w-full justify-center bg-yellow-500/80 pl-24 dark:bg-yellow-900/40 lg:pl-40">
    <Toolbar :editor="editor" :current="node" :source-code-callback="toggleSourceCode"></Toolbar>
  </div>

  <!-- 编辑框 -->
  <div class="z-30 flex w-full flex-row justify-center border-0 px-4">
    <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose w-full xl:prose-lg lg:mr-56" />
  </div>

  <!-- 源码 -->
  <div class="container">
    <Monaco :keyUpCallback="save" v-if="sourceCodeDisplay" :code="code" language="html" :readOnly="false" :showLineNumbers="true"></Monaco>
  </div>
</template>

<script setup>
import Extensions from "../../entities/Extensions";
import { Node } from "../../models/Node";
import { ref, watch, onBeforeUnmount } from "vue";
import Monaco from "./Monaco.vue";
import Toolbar from "../blocks/Toolbar.vue";
import { Editor, EditorContent } from "@tiptap/vue-3";

const props = defineProps({
  node: Node,
  editable: Boolean,
  saveCallback: null,
});

let code = ref(props.node.getContent());
let sourceCodeDisplay = ref(false);

let toggleSourceCode = function () {
  sourceCodeDisplay.value = !sourceCodeDisplay.value;
};

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

let save = function (content) {
  props.saveCallback(content);
  code.value = content;
  editor.commands.setContent(content, false);
};

watch(props, () => {
  console.log("editor 发现 props 发生变化，更新内容");
  editor.destroy();
  editor = getEditor();
});

onBeforeUnmount(() => {
  console.log('销毁TipTap Editor')
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
