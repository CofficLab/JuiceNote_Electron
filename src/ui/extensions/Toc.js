import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Toc from "./Toc.vue";

export default Node.create({
  name: "tableOfContents",
  group: "block",
  atom: true,

  parseHTML() {
    return [
      {
        tag: "toc",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["toc", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return VueNodeViewRenderer(Toc);
  },
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      toggleToc:
        () =>
        ({ editor, commands }) => {
          let html = editor.getHTML();
          if (html.includes("<toc></toc>")) {
            commands.setContent(html.replaceAll("<toc></toc>", ""), true);
            return;
          }

          return commands.insertContentAt(0, "<toc></toc>", {
            updateSelection: true,
            parseOptions: {
              preserveWhitespace: "full",
            },
          });
        },
    };
  },
});
