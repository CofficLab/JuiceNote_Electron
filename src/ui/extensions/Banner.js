import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Banner from "./Banner.vue";

export default Node.create({
  name: "banner",

  group: "block",

  content: "inline*",

  parseHTML: () => [{ tag: "banner" }],

  renderHTML: () => ["banner", 0],

  addNodeView: () => VueNodeViewRenderer(Banner),

  addCommands() {
    return {
      setBanner:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
      toggleBanner:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});
