import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Tab from "./Tab.vue";

export default Node.create({
  name: "tab",
  group: "block",
  content: "inline*",
  // 将什么样的HTML转化成tab
  parseHTML() {
    return [
      {
        tag: "tab",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["tab", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Tab);
  },

  addCommands() {
    return {
      setTab:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
    };
  },
});
