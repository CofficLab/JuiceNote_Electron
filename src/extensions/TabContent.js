import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TabContent from "./TabContent.vue";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export default Node.create({
  name: "tabContent",
  group: "block",
  // draggable: true,
  // 子元素都是block
  content: "block*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab-content></tab-content>
  parseHTML() {
    return [{ tag: "tab-content" }];
  },

  addAttributes() {
    return {
      class: {
        default: "bg-green-300",
      },
      index: {
        default: 0,
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(TabContent);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        filterTransaction(transaction, state) {
          console.log("filter transaction");
          let result = true; // true for keep, false for stop transaction
          const replaceSteps = [];
          transaction.steps.forEach((step, index) => {
            console.log("step is ", step.jsonID);
            if (step.jsonID === "replaceAround") {
              replaceSteps.push(index);
            }
          });

          replaceSteps.forEach((index) => {
            const map = transaction.mapping.maps[index];
            const oldStart = map.ranges[0];
            const oldEnd = map.ranges[0] + map.ranges[1];
            state.doc.nodesBetween(oldStart, oldEnd, (node) => {
              console.log("filter node", node);
              if (node.type.name === "tabContent") {
                result = false;
              }
            });
          });

          console.log(result);
          return result;
        },
      }),
    ];
  },
  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["tab-content", HTMLAttributes, 0];
  },
});
