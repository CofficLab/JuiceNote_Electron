<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div
      v-if="editor && editable"
      class="sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/50 shadow-2xl"
    >
      <Toolbar :editor="editor"></Toolbar>
    </div>

    <!-- 编辑框 -->
    <div class="mt-1 flex w-full justify-center border-0 p-4 pb-24">
      <editor-content :editor="editor" class="prose xl:prose-lg" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";
import RouteController from "../controllers/RouteController";
import Extensions from "../entities/Extensions";
import Toolbar from "./Toolbar.vue";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    Toolbar,
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    editable: () => RouteController.editable,
    content: () => RouteController.currentPage.getSourceCode(),
  },
  mounted() {
    console.log("mounted, init the editor");
    this.editor = new Editor({
      content: this.content,
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
      onUpdate: () => {
        console.log("editor updated");
      },
      onRenderTriggered: () => {
        console.log("render triggered");
      },
      onSelectionUpdate: () => {
        console.log("selection update");
      },
      onRenderTracked: () => {
        console.log("render tracked");
      },
    });
  },
  watch: {
    content(value) {
      console.log("content changed");
      this.editor.commands.setContent(value, true);
    },
    editable() {
      console.log("editable changed", this.editable);
      this.editor.setEditable(this.editable);
      this.editor.commands.setContent(RouteController.currentPage.getSourceCode(), false);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
