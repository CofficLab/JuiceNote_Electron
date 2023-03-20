import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../../entities/Config";

import Chat from "./Chat.vue";

export default Node.create({
  name: "chat",
  group: "block",
  content: "block*",

  parseHTML() {
    return [{ tag: "chat" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["chat", mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      position: {
        default: "start",
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(Chat);
  },

  addCommands() {
    return {
      addChat:
        () =>
        ({ commands }) => {
          return commands.insertContent("<chat>type here</chat>");
        },
      toggleChat:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});
