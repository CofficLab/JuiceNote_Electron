import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { readFileSync } from "fs";
import { join } from "path";
import Config from "../entities/Config";

import Banner from "./Banner.vue";

export default Node.create({
  name: "banner",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "banner",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    let infoDom = document.createElement("div");
    infoDom.innerHTML = readFileSync(join(Config.rootPath, "src", "assets", "icons", "info.svg")).toString();

    return [
      "banner",
      { class: "banner" },
      ["div", { class: "flex justify-center items-center" }, infoDom],
      ["div", mergeAttributes(HTMLAttributes), 0],
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Banner);
  },

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
