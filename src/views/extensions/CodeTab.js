import { VueNodeViewRenderer, Node } from "@tiptap/vue-3";

import CodeTab from "./CodeTab.vue";

export default Node.create({
  name: "codeTab",
  group: "block",
  content: "block*",

  parseHTML() {
    return [{ tag: "code-tab" }];
  },

  addAttributes() {
    return {
      titles: {
        default: "",
        parseHTML: (element) => element.getAttribute("titles"),
        rendered: true,
      },
      current: { default: 1 },
      count: {
        default: 0,
        parseHTML: (element) => element.childNodes.length,
        rendered: false,
      },
    };
  },

  addStorage() {
    return { current: 0 };
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["code-tab", HTMLAttributes, 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeTab);
  },

  addCommands() {
    return {
      addCodeTab:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent(
            '<code-tab titles="1,2" current="1">' +
              "<pre index=1><code>第1个tab的内容</code></pre>" +
              "<pre index=2><code>第2个tab的内容</code></pre>" +
              "</code-tab>"
          );
        },
    };
  },
});
