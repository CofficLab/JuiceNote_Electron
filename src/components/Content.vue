<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div
      id="toolbar"
      v-if="editor && editable"
      class="sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/50 shadow-2xl"
    >
      <div class="dropdown-hover dropdown">
        <label tabindex="0" class="btn-sm btn m-1">格式</label>
        <ul tabindex="0" class="dropdown-content menu rounded-box flex w-52 justify-center bg-base-100 p-2 shadow">
          <li>
            <a
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >
              h1
            </a>
          </li>
          <li>
            <a
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >
              h2
            </a>
          </li>
        </ul>
      </div>
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        加粗
      </button>
      <button @click="editor.chain().focus().toggleBanner().run()" :class="{ 'is-active': editor.isActive('banner') }">
        提示框
      </button>
      <button @click="editor.chain().focus().toggleBrick().run()" :class="{ 'is-active': editor.isActive('brick') }">
        砖块
      </button>
      <button
        @click="editor.chain().focus().toggleOfficialLink().run()"
        :class="{ 'is-active': editor.isActive('official-link') }"
      >
        官网
      </button>
      <button @click="inputLink" :class="{ 'is-active': editor.isActive('link') }">设置链接</button>
      <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">取消链接</button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        代码块
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        取消
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        恢复
      </button>
      <button @click="save">保存</button>
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
import { writeFileSync } from "fs";
import ToastController from "../controllers/ToastController";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import "highlight.js/styles/github-dark.css";
// 自定义的编辑器扩展
import Brick from "../tiptap_extensions/Brick.js";
import Banner from "../tiptap_extensions/Banner.js";
import OfficialLink from "../tiptap_extensions/OfficialLink.js";

const extensions = [
  Banner,
  Link.configure({
    HTMLAttributes: {
      target: "_blank",
    },
  }),
  OfficialLink,
  Document,
  Text,
  History,
  Heading,
  Paragraph,
  Bold,
  // FloatingMenu,
  // BubbleMenu,
  Brick,
  CodeBlockLowlight.configure({
    lowlight,
  }),
];

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },
  data() {
    return {
      editor: null,
      showLinkModal: false,
      url: "", // 设置链接扩展用到的，记录用户输入的URL
    };
  },
  computed: {
    editable: () => RouteController.editMode,
    content: () => RouteController.currentPage.markdownSourceCode(),
  },
  mounted() {
    console.log("mounted, init the editor");
    this.editor = new Editor({
      content: this.content,
      extensions: extensions,
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
  methods: {
    save() {
      let current = RouteController.getCurrentPage();
      writeFileSync(current.path.replace(".md", ".html"), this.editor.getHTML());
      ToastController.set("已保存");
      RouteController.toggleEditMode();
    },
    inputLink() {
      this.showLinkModal = true;
    },
    cancelSetLink() {
      this.showLinkModal = false;
    },
    setLink() {
      this.showLinkModal = false;
      const previousUrl = this.editor.getAttributes("link").href;
      const url = this.url ?? previousUrl;

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped lang="postcss">
#toolbar button {
  @apply btn-sm btn;
}

.bubble-menu button,
.floating-menu button {
  @apply btn-sm btn mx-1 rounded-none;
}
</style>
