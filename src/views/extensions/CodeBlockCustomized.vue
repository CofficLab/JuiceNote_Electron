<template>
  <node-view-wrapper>
    <div class="mb-4 rounded bg-slate-900 pb-2">
      <!-- 操作栏 -->
      <div class="code-block-operators" v-if="editable">
        <div class="flex gap-4">
          <button @click="setRun" :disabled="runButtonDisplay">可运行</button>
          <button @click="setNotRun" :disabled="!runButtonDisplay">不可运行</button>
        </div>

        <select name="language" @change="setLanguage">
          <option disabled selected>未选择编程语言</option>
          <option value="text" v-bind:selected="node.attrs.language == 'text'">纯文本</option>
          <option value="go" v-bind:selected="node.attrs.language == 'go'">Golang</option>
          <option value="php" v-bind:selected="node.attrs.language == 'php'">PHP</option>
          <option value="javascript" v-bind:selected="node.attrs.language == 'javascript'">JavaScript</option>
          <option value="java" v-bind:selected="node.attrs.language == 'java'">Java</option>
          <option value="python" v-bind:selected="node.attrs.language == 'python'">Python</option>
          <option value="shell" v-bind:selected="node.attrs.language == 'shell'">Shell</option>
        </select>
      </div>

      <!-- 顶部横幅 -->
      <div v-if="!editable" class="monaco-banner">
        <div v-html="node.attrs.language"></div>
      </div>

      <!-- Monaco编辑器的代码框，指定了编程语言的时候显示 -->
      <Monaco
        v-if="node.attrs.language != 'text'"
        ref="monaco"
        :code="node.attrs.code"
        :language="node.attrs.language"
        :keyUpCallback="keyup"
        :readOnly="!editable"
        :style="{ height: monacoEditorHeight }"
      ></Monaco>

      <!-- 普通代码框，是纯文本的时候显示 -->
      <pre v-if="node.attrs.language == 'text'" style="margin-top: 0"><code v-html="node.attrs.code"></code></pre>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" v-bind:class="{ hidden: nodeViewContentHidden }" />

      <!-- 底部的运行按钮 -->
      <div class="mt-2 flex flex-row items-start justify-end gap-4 px-1" v-if="runButtonDisplay">
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
      nodeViewContentHidden: false,
      monacoEditorHeight: 0,
    };
  },

  computed: {
    editable() {
      console.log("检查Monaco Editor是否可编辑", NodeController.getEditable());
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
      // console.log("code block key up,value is", value);
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
  },

  mounted() {
    // 先展示出来，获取高度，然后隐藏掉
    let viewNodeContent = this.$refs.nodeViewContent.$el;
    this.nodeViewContentHidden = true;

    // Monaco Editor 初始化必须提供一个固定的高度
    this.monacoEditorHeight = Math.min(500, viewNodeContent.scrollHeight) + "px";
  },

  props: nodeViewProps,
};
</script>

<style lang="postcss">
.code-block-operators {
  @apply mb-4 flex justify-between bg-green-100 shadow-xl dark:bg-green-900/50;

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
