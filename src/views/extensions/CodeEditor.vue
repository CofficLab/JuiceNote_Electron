<template>
  <!-- 支持在多个标签之间切换，当前节点的index=current时才显示 -->
  <node-view-wrapper ref="content" v-show="index == current" contenteditable="false" class="code-editor">
    <div class="relative rounded-b bg-slate-900">
      <!-- 操作栏 -->
      <div class="code-block-operators" v-if="editable && loadMonaco" contenteditable="false">
        <button @click="toggleRun" v-html="this.node.attrs.run == 1 ? '关运行' : '开运行'"></button>
        <select name="language" @change="setLanguage">
          <option value="text" v-bind:selected="language == 'text'">纯文本</option>
          <option value="html" v-bind:selected="language == 'html'">HTML</option>
          <option value="go" v-bind:selected="language == 'go'">Golang</option>
          <option value="php" v-bind:selected="language == 'php'">PHP</option>
          <option value="javascript" v-bind:selected="language == 'javascript'">JavaScript</option>
          <option value="java" v-bind:selected="language == 'java'">Java</option>
          <option value="python" v-bind:selected="language == 'python'">Python</option>
          <option value="shell" v-bind:selected="language == 'shell'">Shell</option>
        </select>
      </div>

      <!-- Monaco编辑器，可修改 -->
      <Monaco
        v-if="this.editable && loadMonaco"
        :code="code"
        :language="language"
        :showRunButton="node.attrs.run == 1"
        :keyUpCallback="keyup"
        :showLineNumbers="true"
      ></Monaco>

      <!-- Monaco编辑器，只读模式。应该实例化一个Monaco，然后动态改变readonly属性，但是有BUG：动态改变整个界面会卡住 -->
      <Monaco
        v-if="!this.editable && loadMonaco"
        :code="code"
        :language="language"
        :showRunButton="node.attrs.run == 1"
        :readOnly="true"
      ></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" class="hidden" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "../components/Monaco.vue";
import NodeController from "../../controllers/NodeController";

export default {
  components: { NodeViewWrapper, NodeViewContent, Monaco },

  data() {
    return {
      code: "",
      current: 0,
      index: 0,
      loadMonaco: false, // 获取code后再加载Monaco
    };
  },

  computed: {
    editable: () => NodeController.getEditable(),
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
      let book = NodeController.getCurrentPage().getBook();
      let language = book.title.toLowerCase();
      if (language == "Golang") return "go";
      if (language == "golang") return "go";
      return language;
    },
    language() {
      if (this.node.attrs.language == "") {
        this.updateAttributes({ language: this.currentLanguage });
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
        console.log("my index is", this.index);
      });
    },
    setCurrent: function () {
      this.$nextTick(function () {
        let parentElement = this.$refs.content;
        if (!parentElement) return;

        this.current = parentElement.$el.parentElement?.getAttribute("data-current") ?? 0;
        // console.log("active index is", this.current, "my index is", this.index);
      });
    },
  },

  mounted() {
    this.code = this.node.attrs.code;
    this.loadMonaco = true;
    this.setCurrent();
    this.setIndex();
    this.editor.on("update", () => {
      this.setCurrent();
      this.setIndex();
    });
  },

  props: nodeViewProps,
};
</script>

<style lang="postcss">
.code-block-operators {
  @apply absolute right-0 top-0 z-50 flex h-8 w-48 items-end justify-end bg-sky-600 shadow-xl dark:bg-green-900/50;

  button {
    @apply btn-sm btn m-0 rounded-none;
  }
  select {
    @apply select-sm max-w-xs rounded-none bg-green-500/60 outline-none dark:bg-green-800/60;
  }
  div.selected {
    @apply max-w-xs rounded-none px-4 outline-none;
  }
}
.monaco-banner {
  @apply flex items-center justify-end rounded-tr bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 pr-2 text-slate-400;
}
</style>
