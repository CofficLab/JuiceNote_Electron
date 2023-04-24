<template>
  <!-- 支持在多个标签之间切换，当前节点的index=current时才显示 -->
  <node-view-wrapper ref="contentDom" v-show="visible" contenteditable="false" class="code-editor overflow-visible rounded">
    <div class="relative rounded-b bg-slate-900">
      <Monaco :code="code" :language="language" :showRunButton="node.attrs.run == 1" :keyUpCallback="keyup" :showLineNumbers="true"></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <node-view-content ref="nodeViewContent" class="hidden" />
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "../components/Monaco.vue";
import { useRoute } from "vue-router";
import Node from "../entities/Node";
import { computed, ref } from "vue";

const route = useRoute();
const props = defineProps(nodeViewProps);

let visible = ref(props.node.attrs.visible);
let contentDom = ref();
let code = ref(props.node.attrs.code);

let currentLanguage = computed(() => {
  let book = Node.find(parseInt(route.params.id.toString())).getBook();
  let language = book.title.toLowerCase();
  if (language == "Golang") return "go";
  if (language == "golang") return "go";

  console.log("自动判断图书对应的编程语言，结果", language);
  return language;
});

let language = computed(() => {
  if (props.node.attrs.language == "") {
    // console.log('没有设置编程语言，自动设置为', this.currentLanguage);
    // this.updateAttributes({ language: this.currentLanguage });
    return currentLanguage;
  }

  return props.node.attrs.language;
});

function keyup(value) {
  // console.log("更新代码块的内容为", value);
  props.updateAttributes({
    code: value,
  });
}
</script>

<style lang="postcss">
.code-block-operators {
  @apply z-50 flex h-6 w-full justify-between bg-sky-600 shadow-xl dark:bg-green-900/50;

  button {
    @apply btn-ghost btn-xs btn m-0 rounded-none text-gray-100;
  }

  select {
    @apply max-w-xs rounded-none bg-green-500/60 outline-none dark:select-xs dark:bg-green-800/60;
  }

  div.selected {
    @apply max-w-xs rounded-none px-4 outline-none;
  }
}

.monaco-banner {
  @apply flex items-center justify-end rounded-tr bg-gradient-to-r from-transparent via-transparent to-cyan-500/20 pr-2 text-slate-400;
}
</style>
