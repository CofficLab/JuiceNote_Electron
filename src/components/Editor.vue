<template>
  <div class="prose flex h-full flex-col gap-8 xl:prose-2xl">
    <div v-if="editor">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
      <button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button @click="editor.chain().focus().toggleBanner().run()" :class="{ 'is-active': editor.isActive('banner') }">
        banner
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
      <button @click="editor.chain().focus().setHardBreak().run()">hard break</button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
      <button @click="save">保存</button>
    </div>
    <div>
      <editor-content :editor="editor" class="overflow-scroll bg-base-300" />
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
      extensions: [
        Banner,
        StarterKit,
        Document,
        Paragraph,
        Text,
        Heading.configure({
          levels: [1, 2, 3],
        }),
      ],
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
  @apply btn rounded-none;
}
</style>
