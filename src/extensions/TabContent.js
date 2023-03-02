import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TabContent from "./TabContent.vue";

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

  onFocus() {
    console.log("tab content 检测到update事件,this.editor.storage.tab.current=", this.editor.storage.tab.current);
  },

  onTransaction() {
    console.log("tab content 检测到transaction事件,this.editor.storage.tab.current=", this.editor.storage.tab.current);
  },
  onSelectionUpdate({ editor }) {
    console.log(
      "tab content 检测到onSelectionUpdate事件,this.editor.storage.tab.current=",
      this.editor.storage.tab.current
    );
  },
  onBlur({ editor }) {
    console.log("tab content 检测到onSelectionUpdate事件,this.editor.storage.tab.current=", editor.storage.tab.current);
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["tab-content", HTMLAttributes, 0];
  },
});
