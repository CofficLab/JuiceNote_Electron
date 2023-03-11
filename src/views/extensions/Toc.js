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
          let dom = document.createElement("div");
          dom.innerHTML = editor.getHTML();
          if (dom.firstElementChild.tagName == "TOC") {
            return commands.deleteRange({ from: 0, to: 1 });
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
