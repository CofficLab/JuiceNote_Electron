<template>
  <NodeViewWrapper ref="contentDom" contenteditable="false" class="code-editor my-4 overflow-visible rounded">
    <div class="tabs flex flex-row justify-between overflow-hidden rounded-none bg-yellow-600 p-0" contenteditable="false">
      <!-- 标签列表 -->
      <div class="tab-list" ref="titlesDom">
        <div v-for="(item, index) in items" class="flex h-8 flex-row flex-nowrap items-stretch outline-none" :class="{ 'bg-gray-900': index == activatedIndex }">
          <a class="code-title" @click="activate(index)">{{ item.title }}</a>
        </div>
      </div>

      <!-- 标签操作栏 -->
      <div class="tab-operators">
        <button class="btn-ghost btn-sm btn rounded-none" @click="createTab">
          <Plus class="w-6 self-center dark:text-lime-900"></Plus>
        </button>
      </div>
    </div>

    <div class="relative rounded-b bg-slate-900">
      <Monaco
        :code="activatedItem.content"
        :language="activatedItem.language"
        :runnable="activatedItem.runnable"
        :showRunButton="node.attrs.run == 1"
        :onChange="handleChange"
        :onDelete="handleDelete"
        :showLineNumbers="true"
      ></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <NodeViewContent ref="nodeViewContent" class="hidden" />
    </div>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "./Monaco.vue";
import { Database, CodeBlock } from "./Database";
import { ref, computed } from "vue";
import Plus from "./plus.vue";

const props = defineProps(nodeViewProps);

let contentDom = ref();
let database = computed<Database>(() => new Database(props.node.attrs.database));
let items = computed<CodeBlock[]>(() => database.value.items);
let activatedIndex = computed(() => database.value.activatedIndex);
let activatedItem = computed(() => items.value[activatedIndex.value]);

function createTab() {
  props.updateAttributes({
    database: database.value.appendNewCodeBlock().toJSON(),
  });
}

function activate(index) {
  props.updateAttributes({
    database: database.value.updateActivatedIndex(index).toJSON(),
  });
}

function handleChange(editorBox) {
  console.log("code editor found monaco changed", editorBox.runnable);
  props.updateAttributes({
    code: editorBox.getContent(),
    database: database.value.updateLanguage(editorBox.getLanguage()).updateRunnable(editorBox.runnable).toJSON(),
  });
}

function handleDelete() {
  if (items.value.length == 1) {
    return props.deleteNode();
  }

  props.updateAttributes({
    database: database.value.deleteCodeBlock(activatedIndex.value).toJSON(),
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

.code-title {
  @apply tab min-w-max max-w-xl flex-grow flex-nowrap whitespace-nowrap rounded-none text-gray-500 no-underline outline-none  focus-visible:outline-none dark:text-gray-200 !important;
}

.tab-list {
  @apply flex w-5/6 max-w-max flex-grow flex-row gap-px overflow-x-scroll overscroll-none bg-gray-800;
}

.tab-operators {
  @apply flex w-1/6 max-w-max justify-end border-l border-lime-900/30 shadow-2xl dark:border-l-lime-900;
}
</style>
