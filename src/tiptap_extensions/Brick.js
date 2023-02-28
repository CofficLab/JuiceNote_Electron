import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../entities/Config";

import Brick from "./Brick.vue";

export default Node.create({
  name: "brick",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "brick",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["brick", { class: "brick" }, ["div", mergeAttributes(HTMLAttributes), 0]];
  },

  addNodeView() {
    return VueNodeViewRenderer(Brick);
  },

  addCommands() {
    return {
      setBrick:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
      toggleBrick:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});
