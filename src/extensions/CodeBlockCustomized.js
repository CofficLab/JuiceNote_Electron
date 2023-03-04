import CodeBlock from "@tiptap/extension-code-block";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockCustomized from "./CodeBlockCustomized.vue";
import { mergeAttributes } from "@tiptap/core";

export default CodeBlock.extend({
  name: "codeBlockCustomized",

  addAttributes() {
    return {
      code: {
        default: "",
      },
      language: {
        default: "",
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeBlockCustomized);
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "code",
        {
          class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null,
        },
        0,
      ],
    ];
  },
});
