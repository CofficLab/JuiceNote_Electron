<template>
  <!-- 工具栏 -->
  <div id="toolbar-container" v-if="editable">
    <Toolbar :editor="editor" :current="node" :source-code-callback="toggleSourceCode"></Toolbar>
  </div>

  <!-- 编辑框 -->
  <div id="editor-container" class="mt-1 flex w-full flex-row justify-center border-0 p-4">
    <editor-content v-if="!sourceCodeDisplay" :editor="editor" class="prose overflow-visible xl:prose-lg lg:mr-56" />
  </div>

  <!-- 源码 -->
  <div class="container">
    <Monaco :keyUpCallback="save" v-if="sourceCodeDisplay" :code="code" language="html" :readOnly="false" :showLineNumbers="true"></Monaco>
  </div>
</template>

<script setup>
import Extensions from "../../entities/Extensions";
import { Node } from "../../models/Node";
import { defineProps, ref, watch, onBeforeUnmount } from "vue";
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

let editor = new Editor({
  extensions: Extensions,
  content: props.node.getContent(),
  autofocus: true,
  injectCSS: true,
  enableInputRules: true,
  enablePasteRules: false,
  parseOptions: {
    preserveWhitespace: "full",
  },
  onUpdate: (event) => {
    props.saveCallback && props.saveCallback(event.editor.getHTML());
  },
});

let save = function (content) {
  props.saveCallback(content);
  code.value = content;
  editor.commands.setContent(content, false);
};

watch(props, () => {
  editor.commands.setContent(props.node.getContent(), true);
});

onBeforeUnmount(() => {
  editor.destroy();
});
</script>

<style lang="postcss">
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
