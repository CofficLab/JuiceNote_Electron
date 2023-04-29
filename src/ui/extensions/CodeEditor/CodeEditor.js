import CodeBlock from "@tiptap/extension-code-block";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeEditor from "./CodeEditor.vue";
import { Database, CodeBlock as DatabaseCodeBlock } from "./Database";

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
      database: {
        default: new Database().toJSON(),
        parseHTML: (element) => {
          let getFromAttribute = element.getAttribute("database");

          if (getFromAttribute && getFromAttribute.length > 0) {
            try {
              return new Database(getFromAttribute).toJSON();
            } catch (error) {
              console.log(error);
            }
          }

          return Database.createWithSingleCodeBlock(
            new DatabaseCodeBlock({
              content: element.innerText,
              title: "代码块",
              language: "go",
            })
          ).toJSON();
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
        database: node.attrs.database,
      },
      ["code", node.attrs.code],
    ];
  },
});
