import CodeBlock from "@tiptap/extension-code-block";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeEditor from "./CodeEditor.vue";

export default CodeBlock.extend({
  name: "codeEditor",

  addAttributes() {
    return {
      height: {
        default: 0,
        rendered: true,
      },
      code: {
        default: "",
        rendered: false,
        parseHTML: (element) => element.firstElementChild?.innerText,
      },
      language: {
        default: "",
        parseHTML: function (element) {
          let language = element.firstElementChild?.getAttribute("language");
          if (language == "Golang") return "go";
          if (language == "golang") return "go";
          return language;
        },
        rendered: true,
      },
      run: {
        default: 1,
        parseHTML: (element) => parseInt(element.firstElementChild?.getAttribute("run")),
        rendered: true,
      },
      visible: {
        default: true,
        rendered: true,
        parseHTML: (element) => {
          let parent = element.parentElement;
          if (parent.nodeName == "CODE-TAB") {
            return Array.from(parent.children).findIndex((node) => node == element) == parent.getAttribute("current");
          }

          return true;
        },
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeEditor);
  },

  renderHTML({ node }) {
    // console.log("转换成HTML", node.attrs);
    return [
      "pre",
      {
        height: node.attrs.height,
        visible: node.attrs.visible,
      },
      ["code", { language: node.attrs.language, run: node.attrs.run }, node.attrs.code],
    ];
  },
});
