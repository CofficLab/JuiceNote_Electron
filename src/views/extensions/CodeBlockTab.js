import { VueNodeViewRenderer, Node } from "@tiptap/vue-3";

import CodeBlockTab from "./CodeBlockTab.vue";

// 配合 TabContent 使用，Tab 是这样的结构
// <tab>
//  <tab-content>
//  <tab-content>
// </tab>
export default Node.create({
  name: "codeBlockTab",
  group: "block",
  // 子元素都是block
  content: "block*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab></tab>
  parseHTML() {
    return [
      {
        tag: "code-block-tab",
      },
    ];
  },

  // 定义属性
  // 存储到HTML中是这样的：<tab titles="1,2,3" current="0"></tab>
  addAttributes() {
    return {
      titles: {
        default: "",
      },
      current: {
        default: 0,
      },
    };
  },

  addStorage() {
    return {
      current: 0,
    };
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["code-block-tab", HTMLAttributes, 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeBlockTab);
  },

  addCommands() {
    return {
      addCodeBlockTab:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent(
            '<code-block-tab titles="1,2,3" current="0">' +
              "<pre index=0><code>第1个tab的内容</code></pre>" +
              "<pre index=1><code>第2个tab的内容</code></pre>" +
              "<pre index=2><code>第3个tab的内容</code></pre>" +
              "</code-block-tab>"
          );
        },
    };
  },
});
