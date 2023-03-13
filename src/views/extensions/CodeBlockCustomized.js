import CodeBlock from "@tiptap/extension-code-block";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockCustomized from "./CodeBlockCustomized.vue";

export default CodeBlock.extend({
  name: "codeBlockCustomized",

  addAttributes() {
    return {
      code: {
        default: "",
        rendered: false,
        parseHTML: (element) => element.firstElementChild?.innerText,
      },
      language: {
        default: "",
        parseHTML: (element) => element.firstElementChild?.getAttribute("language"),
        rendered: true,
      },
      run: {
        default: false,
        parseHTML: (element) => element.firstElementChild?.getAttribute("run"),
        rendered: true,
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeBlockCustomized);
  },

  renderHTML({ node }) {
    console.log("转换成HTML", node.attrs);
    return ["pre", ["code", { language: node.attrs.language, run: node.attrs.run }, node.attrs.code]];
  },
});
