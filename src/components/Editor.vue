<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div
      v-if="editor"
      class="sticky top-0 flex w-full flex-row items-center justify-center gap-2 bg-green-300/50 shadow-2xl"
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

      <button @click="editor.chain().focus().toggleBanner().run()" :class="{ 'is-active': editor.isActive('banner') }">
        提示框
      </button>
      <button
        @click="editor.chain().focus().toggleOfficialLink().run()"
        :class="{ 'is-active': editor.isActive('official-link') }"
      >
        官网
      </button>
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
    <div class="mt-1 flex w-full justify-center border-0 bg-base-100 p-4 pb-24">
      <editor-content :editor="editor" class="prose xl:prose-lg" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import RouteController from "../controllers/RouteController";
import { writeFileSync } from "fs";
import ToastController from "../controllers/ToastController";
import Banner from "../tiptap_extensions/Banner.js";
import OfficialLink from "../tiptap_extensions/OfficialLink.js";
// 代码高亮
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export default {
  components: {
    EditorContent,
    Banner,
    OfficialLink,
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
        OfficialLink,
        CodeBlockLowlight.configure({
          lowlight,
          defaultLanguage: "plaintext",
          languageClassPrefix: "language-",
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
      RouteController.toggleEditMode();
    },
  },
};
</script>

<style scoped lang="postcss">
button {
  @apply btn-sm btn;
}
</style>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  // > * + * {
  //   margin-top: 0.75em;
  // }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
