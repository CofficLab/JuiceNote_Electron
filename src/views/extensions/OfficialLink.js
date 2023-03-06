import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import OfficialLink from "./OfficialLink.vue";

export default Node.create({
  name: "official-link",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "official-link",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["official-link", mergeAttributes(HTMLAttributes, { class: "bg-cyan-800/20 p-4" }), 0];
  },
  addNodeView() {
    return VueNodeViewRenderer(OfficialLink);
  },
  addCommands() {
    return {
      setOfficialLink:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
      toggleOfficialLink:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});
