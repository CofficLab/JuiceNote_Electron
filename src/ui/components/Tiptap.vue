<template>
  <div class="flex w-full flex-row justify-center border-0 px-4">
    <editor-content :editor="editor" class="prose w-full xl:prose-lg" />
  </div>
</template>

<script setup>
import Extensions from "../entities/Extensions";

import { ref, watch, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Node } from "../entities/Node";
import useEditorStore from '../stores/EditorStore'

const editorStore = useEditorStore()

const props = defineProps({
  node: Node,
  editable: Boolean,
  saveCallback: null,
});

let code = ref(props.node.content);

let getEditor = () =>
  new Editor({
    extensions: Extensions,
    content: props.node.content,
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
editorStore.set(editor)

watch(props, () => {
  // console.log("editor 发现 props 发生变化，更新内容");
  editor.destroy();
  editor = getEditor();
});

onBeforeUnmount(() => {
  // console.log("销毁TipTap Editor");
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
