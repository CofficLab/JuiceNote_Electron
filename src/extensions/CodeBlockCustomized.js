import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockCustomized from "./CodeBlockCustomized.vue";

export default CodeBlockLowlight.extend({
  name: "codeBlockCustomized",

  addNodeView() {
    return VueNodeViewRenderer(CodeBlockCustomized);
  },
});
