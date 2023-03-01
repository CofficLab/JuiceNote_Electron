import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Tab from "./Tab.vue";

export default Node.create({
  name: "tab",
  group: "block",
  content: "inline*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab tabs="第一个tab的内容,第二个tab的内容,第三个tab的内容"></tab>
  parseHTML() {
    return [
      {
        tag: "tab",
      },
    ];
  },

  // 定义存储到HTML的时候的属性
  // 存储到HTML中是这样的：<tab tabs="第一个tab的内容,第二个tab的内容,第三个tab的内容"></tab>
  addAttributes() {
    return {
      tabs: {
        default: [],
      },
    };
  },

  // 将数据存储成HTML
  renderHTML({ HTMLAttributes, node }) {
    console.log("render HTML", HTMLAttributes.tabs);

    // let children = [];
    // let items = JSON.parse(HTMLAttributes.tabs);
    // for (let i = 0; i < items.length; i++) {
    //   children.push(["div", items[i]]);
    // }

    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成tab的属性
    // 后面的参数都是tab的子元素
    return [
      "tab",
      {
        tabs: JSON.stringify(["第一个tab的内容", "第二个tab的内容", "第三个tab的内容"]),
      },
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Tab);
  },

  addCommands() {
    return {
      setTab:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
    };
  },
});
