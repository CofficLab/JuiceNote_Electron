import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../entities/Config";

import Tab from "./Tab.vue";

export default Node.create({
  name: "tab",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "tab",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    let infoDom = document.createElement("div");
    infoDom.innerHTML = readFileSync(join(Config.rootPath, "src", "assets", "icons", "info.svg")).toString();

    return [
      "tab",
      { class: "tab" },
      ["div", { class: "flex justify-center items-center" }, infoDom],
      ["div", mergeAttributes(HTMLAttributes), 0],
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Banner);
  },

  addCommands() {
    return {
      addTab:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },
});
