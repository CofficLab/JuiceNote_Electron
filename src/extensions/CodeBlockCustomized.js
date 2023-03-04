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
      },
      language: {
        default: "",
        parseHTML: (element) => {
          const language = element.firstElementChild?.getAttribute("language");
          return language;
        },
        rendered: true,
      },
      run: {
        default: false,
        parseHTML: (element) => {
          const run = element.firstElementChild?.getAttribute("run");
          return run;
        },
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
