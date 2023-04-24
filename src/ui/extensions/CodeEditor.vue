<template>
  <!-- 支持在多个标签之间切换，当前节点的index=current时才显示 -->
  <node-view-wrapper ref="content" v-show="node.attrs.visible" contenteditable="false" class="code-editor overflow-visible" :class="{ rounded: !hasSiblings }">
    <div class="relative rounded-b bg-slate-900">
      <!-- Monaco编辑器，可修改 -->
      <Monaco v-if="this.editable && loadMonaco" :code="code" :language="language" :showRunButton="node.attrs.run == 1" :keyUpCallback="keyup" :showLineNumbers="true"> </Monaco>

      <!-- Monaco编辑器，只读模式。应该实例化一个Monaco，然后动态改变readonly属性，但是有BUG：动态改变整个界面会卡住 -->
      <Monaco v-if="!this.editable && loadMonaco" :code="code" :language="language" :showRunButton="node.attrs.run == 1" :readOnly="true"></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" class="hidden" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "../components/Monaco.vue";
import Trash from "../assets/icons/trash.svg";
import { useRoute } from "vue-router";
import ClipboardJS from "clipboard";
import Node from "../entities/Node.ts";
import ToastController from "../entities/Toast";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  ToastController.set("已将源码复制到剪贴板");
});

export default {
  components: { NodeViewWrapper, NodeViewContent, Monaco, Trash },

  data() {
    return {
      code: "",
      current: 0,
      index: 0,
      hasSiblings: false,
      loadMonaco: false, // 获取code后再加载Monaco
    };
  },

  computed: {
    editable: () => useRoute().name == "lessons.edit",
    monacoHeight() {
      // monaco editor 的高度是 code editor 的高度减去底部操作栏的高度
      // code editor 的高度由父元素决定
      let parentHeight = this.$refs.content.$el.parentElement.clientHeight;
      if (this.editable && this.loadMonaco) {
        let operatorBarHeight = this.$refs.content.$el.querySelector(".code-block-operators");
        return parentHeight - operatorBarHeight;
      }

      return parentHeight;
    },
    monacoEditorDisplay() {
      return this.node.attrs.editor == true;
    },
    nodeViewContentDisplay() {
      return !this.nodeViewContentHidden && this.node.attrs.editor != true;
    },
    runButtonDisplay() {
      return this.node.attrs.run == 1;
    },
    currentLanguage() {
      let book = Node.find(useRoute().params.id).getBook();
      let language = book.title.toLowerCase();
      if (language == "Golang") return "go";
      if (language == "golang") return "go";

      console.log("自动判断图书对应的编程语言，结果", language);
      return language;
    },
    language() {
      if (this.node.attrs.language == "") {
        // console.log('没有设置编程语言，自动设置为', this.currentLanguage);
        // this.updateAttributes({ language: this.currentLanguage });
        return this.currentLanguage;
      }

      return this.node.attrs.language;
    },
  },

  methods: {
    keyup(value) {
      // console.log("更新代码块的内容为", value);
      this.updateAttributes({
        code: value,
      });
    },
    toggleRun() {
      let run = parseInt(this.node.attrs.run);
      run = isNaN(run) ? 0 : run;
      this.updateAttributes({
        run: Math.abs(run - 1),
      });
    },
    setLanguage(event) {
      console.log("set language to", event.target.value);
      this.updateAttributes({
        language: event.target.value,
      });
    },
    setIndex() {
      this.$nextTick(function () {
        if (!this.$refs.content) return;
        let myElement = this.$refs.content.$el;
        let parentElement = myElement.parentElement;
        if (!parentElement) return;

        if (Array.from(parentElement.classList).indexOf("code-editor-container") < 0) {
          this.index = 0;
          return;
        }

        this.index = Array.from(parentElement.children).indexOf(myElement);
        // console.log("my index is", this.index);
      });
    },
    setCurrent: function () {
      this.$nextTick(function () {
        let parentElement = this.$refs.content;
        if (!parentElement) return;

        this.current = parentElement.$el.parentElement?.getAttribute("data-current") ?? 0;
        console.log("active index is", this.current, "my index is", this.index);
      });
    },
    deleteSelf() {
      this.deleteNode();
    },
  },

  mounted() {
    this.code = this.node.attrs.code;
    this.loadMonaco = true;
    this.setCurrent();
    this.setIndex();
    this.editor.on("update", () => {
      console.log("code editor检测到editor update");
      this.setCurrent();
      this.setIndex();
    });

    this.$nextTick(function () {
      this.hasSiblings = this.$refs.content.$el.parentElement.classList.contains("code-editor-container");
    });
  },

  props: nodeViewProps,
};
</script>

<style lang="postcss">
.code-block-operators {
  @apply z-50 flex h-6 w-full justify-between bg-sky-600 shadow-xl dark:bg-green-900/50;

  button {
    @apply btn-ghost btn-xs btn m-0 rounded-none text-gray-100;
  }

  select {
    @apply max-w-xs rounded-none bg-green-500/60 bg-green-800/60 outline-none dark:select-xs;
  }

  div.selected {
    @apply max-w-xs rounded-none px-4 outline-none;
  }
}

.monaco-banner {
  @apply flex items-center justify-end rounded-tr bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 pr-2 text-slate-400;
}
</style>
