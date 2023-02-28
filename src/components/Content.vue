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

    <!-- 设置URL的模态框 -->
    <div class="modal" v-bind:class="{ 'modal-open': showLinkModal }">
      <div class="modal-box">
        <label for="my-modal-3" class="btn-sm btn-circle btn absolute right-2 top-2" @click="cancelSetLink">✕</label>
        <h3 class="mb-4 text-lg font-bold">设置链接</h3>
        <input type="text" placeholder="输入URL" class="input-bordered input w-full" v-model="url" />
        <div class="modal-action">
          <label for="my-modal" class="btn" @click="setLink">确定</label>
        </div>
      </div>
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
    content: () => RouteController.currentPage.markdownSourceCode(),
  },
  mounted() {
    console.log("mounted, init the editor");
    this.editor = new Editor({
      content: this.content,
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
    });
  },
  watch: {
    content(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) return;

      this.editor.commands.setContent(value, false);
    },
    editable() {
      console.log("editable changed", this.editable);
      this.editor.setEditable(this.editable);
      this.editor.commands.setContent(RouteController.currentPage.markdownSourceCode(), false);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
