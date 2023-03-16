<template>
  <node-view-wrapper ref="content" v-show="this.current == this.node.attrs.index">
    <div class="rounded bg-slate-900">
      <!-- 顶部横幅 -->
      <div v-if="!editable" class="monaco-banner">
        <div v-html="node.attrs.language"></div>
      </div>

      <!-- Monaco编辑器，可修改 -->
      <Monaco
        v-if="this.editable && loadMonaco"
        :code="code"
        :language="node.attrs.language"
        :keyUpCallback="keyup"
      ></Monaco>

      <!-- Monaco编辑器，只读模式。应该实例化一个Monaco，然后动态改变readonly属性，但是有BUG：动态改变整个界面会卡住 -->
      <Monaco
        v-if="!this.editable && loadMonaco"
        :code="code"
        :language="node.attrs.language"
        :readOnly="true"
      ></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" class="hidden" />

      <!-- 底部的运行按钮 -->
      <div class="mt-2 flex flex-row items-start justify-end gap-4 px-1 pb-2" v-if="runButtonDisplay">
        <!-- 展示运行结果 -->
        <pre class="hidden flex-grow rounded bg-black shadow-sm ring-1" style="margin: 0"><code></code></pre>
        <button
          class="run btn bg-slate-900 shadow-sm"
          :data-code="node.attrs.code"
          :data-language="node.attrs.language"
        >
          运行
        </button>
      </div>

      <!-- 操作栏 -->
      <div class="code-block-operators" v-if="editable">
        <div class="flex gap-4">
          <button @click="setNotRun" v-if="runButtonDisplay">可运行</button>
          <button @click="setRun" v-if="!runButtonDisplay">不可运行</button>
        </div>

        <select name="language" @change="setLanguage">
          <option value="text" v-bind:selected="node.attrs.language == 'text'">纯文本</option>
          <option value="go" v-bind:selected="node.attrs.language == 'go'">Golang</option>
          <option value="php" v-bind:selected="node.attrs.language == 'php'">PHP</option>
          <option value="javascript" v-bind:selected="node.attrs.language == 'javascript'">JavaScript</option>
          <option value="java" v-bind:selected="node.attrs.language == 'java'">Java</option>
          <option value="python" v-bind:selected="node.attrs.language == 'python'">Python</option>
          <option value="shell" v-bind:selected="node.attrs.language == 'shell'">Shell</option>
        </select>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "../components/Monaco.vue";
import NodeController from "../../controllers/NodeController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Monaco,
  },

  data() {
    return {
      code: "",
      current: 0,
      loadMonaco: false, // 获取code后再加载Monaco
    };
  },

  computed: {
    editable() {
      // console.log("检查Monaco Editor是否可编辑", NodeController.getEditable());
      return NodeController.getEditable();
    },
    monacoEditorDisplay() {
      return this.node.attrs.editor == true;
    },
    nodeViewContentDisplay() {
      return !this.nodeViewContentHidden && this.node.attrs.editor != true;
    },
    runButtonDisplay() {
      // console.log("是否要显示运行按钮", this.node.attrs.run);
      return this.node.attrs.run == "true";
    },
  },

  methods: {
    keyup(value) {
      console.log("更新代码块的内容为", value);
      this.updateAttributes({
        code: value,
      });
    },
    setRun() {
      this.updateAttributes({
        run: "true",
      });
    },
    setNotRun() {
      this.updateAttributes({
        run: "false",
      });
    },
    setLanguage(event) {
      console.log("set language to", event.target.value);
      this.updateAttributes({
        language: event.target.value,
      });

      console.log("当前attrs", this.node.attrs);
    },
    setCurrent: function () {
      this.$nextTick(function () {
        this.current = this.$refs.content.$el.parentElement.getAttribute("data-current");
        console.log("current 更新为", this.current, "我的index是", this.node.attrs.index);
      });
    },
  },

  mounted() {
    this.code = this.node.attrs.code;
    this.loadMonaco = true;
    this.setCurrent();
    this.editor.on("update", this.setCurrent);
  },

  props: nodeViewProps,
};
</script>

<style lang="postcss">
.code-block-operators {
  @apply flex justify-end bg-blue-900/80 shadow-xl dark:bg-green-900/50;

  button {
    @apply btn-sm btn rounded-none;
  }

  select {
    @apply select-sm max-w-xs rounded-none rounded-tr bg-green-500/60 outline-none dark:bg-green-800/60;
  }
}
.monaco-banner {
  @apply flex h-full items-center justify-end rounded-tr bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 pr-2 text-slate-400;
}
</style>
