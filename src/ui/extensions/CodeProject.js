import { VueNodeViewRenderer, Node } from "@tiptap/vue-3";

import CodeProject from "./CodeProject.vue";

export default Node.create({
  name: "codeProject",
  group: "block",
  content: "block*",

  parseHTML() {
    return [{ tag: "code-project" }];
  },

  addAttributes() {
    return {
      data: {
        parseHTML: (element) => element.getAttribute("data"),
        rendered: true,
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
    return ["code-project", HTMLAttributes];
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeProject);
  },

  addCommands() {
    return {
      addCodeProject:
        (attributes) =>
          ({ commands }) => {
          let data = [
            {
              "id": 1,
              "parent_id": 0,
              "title":"文件1",
              "content":"文件1的内容"
            },
            {
              "id": 2,
              "parent_id": 0,
              "title":"文件2",
              "content":"文件2的内容"
            }
          ]
          
          return commands.insertContent('<code-project data='+JSON.stringify(data)+'></code-project>');
        },
    };
  },
});
