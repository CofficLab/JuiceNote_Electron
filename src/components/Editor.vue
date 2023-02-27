<template>
  <div class="flex h-full w-full flex-col">
    <!-- 工具栏 -->
    <div v-if="editor" class="flex flex-row items-center gap-2 bg-green-300/50 shadow-2xl">
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

      <button @click="editor.chain().focus().toggleBanner().run()" :class="{ 'is-active': editor.isActive('banner') }">
        提示框
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
    <div class="mt-1 w-full overflow-scroll border-0 bg-base-100 p-4 ring-2">
      <editor-content :editor="editor" class="prose xl:prose-2xl" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import RouteController from "../controllers/RouteController";
import { writeFileSync } from "fs";
import ToastController from "../controllers/ToastController";

import Banner from "../tiptap_extensions/Banner.js";

export default {
  components: {
    EditorContent,
    Document,
    Paragraph,
    Text,
    Banner,
  },

  data() {
    return {
      editor: null,
    };
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [Banner, StarterKit],
      autofocus: true,
      editable: true,
      injectCSS: false,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  watch: {
    content(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  computed: {
    content: function () {
      let current = RouteController.getCurrentPage();
      let sourceCode = RouteController.getCurrentPage().markdownSourceCode();

      if (current.path.includes(".md")) {
        let rendered = require("markdown-it")({ html: true }).render(sourceCode);
        console.log("渲染后的markdown", rendered);
        return rendered;
      }

      return sourceCode;
    },
  },

  methods: {
    save() {
      let current = RouteController.getCurrentPage();
      writeFileSync(current.path.replace(".md", ".html"), this.editor.getHTML());
      ToastController.set("已保存");
    },
  },
};
</script>

<style scoped lang="postcss">
button {
  @apply btn-sm btn;
}
</style>
