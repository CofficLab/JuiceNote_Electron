<template>
  <node-view-wrapper>
    <div class="rounded bg-slate-900 pb-2">
      <!-- 操作栏 -->
      <div class="mb-4 flex justify-between bg-green-100 shadow-xl" v-if="editable">
        <div class="flex gap-4">
          <button class="btn-sm btn rounded-none" @click="setRun" :disabled="runButtonDisplay">可运行</button>
          <button class="btn-sm btn rounded-none" @click="setNotRun" :disabled="!runButtonDisplay">不可运行</button>
        </div>

        <select
          name="language"
          class="select select-sm max-w-xs rounded-none rounded-tr bg-green-500/60 outline-none"
          @change="setLanguage"
        >
          <option disabled selected>未选择编程语言</option>
          <option value="go" v-bind:selected="language == 'go'">Golang</option>
          <option value="php" v-bind:selected="language == 'php'">PHP</option>
          <option value="javascript" v-bind:selected="language == 'javascript'">JavaScript</option>
          <option value="java" v-bind:selected="language == 'java'">Java</option>
          <option value="python" v-bind:selected="language == 'python'">Python</option>
          <option value="shell" v-bind:selected="language == 'shell'">Shell</option>
        </select>
      </div>

      <!-- 顶部横幅 -->
      <div
        v-if="!editable"
        class="text flex h-full items-center justify-end rounded-tr bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 pr-2 text-slate-400"
      >
        <div v-html="node.attrs.language"></div>
      </div>

      <!-- Monaco编辑器的代码框 -->
      <Monaco
        ref="monaco"
        :code="code"
        :language="language"
        :keyUpCallback="keyup"
        :readOnly="!editable"
        v-bind:style="{ height: monacoEditorHeight }"
      ></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" v-bind:class="{ hidden: nodeViewContentHidden }" />

      <!-- 底部的运行按钮 -->
      <div class="mt-2 flex flex-row items-start justify-end gap-4 px-1" v-if="runButtonDisplay">
        <!-- 展示运行结果 -->
        <pre class="hidden flex-grow rounded bg-black shadow-sm ring-1" style="margin: 0"><code></code></pre>
        <button class="run btn bg-slate-900 shadow-sm" :data-code="code" :data-language="language">运行</button>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Info from "../assets/icons/info.svg";
import Monaco from "../components/Monaco.vue";
import RouteController from "../controllers/RouteController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Info,
    Monaco,
  },

  data() {
    return {
      nodeViewContentHidden: false,
      monacoEditorHeight: 0,
    };
  },

  computed: {
    editable: () => RouteController.editable,
    language() {
      // console.log("get language", this.node.attrs);
      return this.node.attrs.language ?? "shell";
    },
    code() {
      let code = this.node.attrs.code;
      if (code.length > 0) {
        return code;
      }

      let codeContents = this.node.content.content;
      if (codeContents.length == 0) {
        return "";
      }

      return this.node.content.content[0].text;
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
    },
  },

  mounted() {
    this.updateAttributes({
      code: this.code,
    });

    // 先展示出来，获取高度，然后隐藏掉
    let viewNodeContent = this.$refs.nodeViewContent.$el;
    this.nodeViewContentHidden = true;

    // Monaco Editor 初始化必须提供一个固定的高度
    this.monacoEditorHeight = Math.min(500, viewNodeContent.scrollHeight) + "px";
  },

  props: nodeViewProps,
};
</script>
