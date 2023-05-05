<template>
  <NodeViewWrapper contenteditable="false" class="code-editor my-4 overflow-visible rounded">
    <div class="tabs flex flex-row justify-between overflow-hidden rounded-none bg-yellow-600 p-0" contenteditable="false" v-if="editor.isEditable || items.length > 1">
      <!-- 标签列表 -->
      <div class="tab-list" ref="titlesDom">
        <div v-for="(item, index) in items" class="flex h-8 flex-row flex-nowrap items-stretch outline-none" :class="{ 'bg-gray-900': index == activatedIndex }">
          <a class="code-title" :contenteditable="editor.isEditable" @keyup="handleUpdateTitle" @click="activate(index)">{{ item.title }}</a>
        </div>
      </div>

      <!-- 标签操作栏 -->
      <div class="tab-operators">
        <button class="btn-ghost btn-sm btn rounded-none" @click="createTab">
          <Plus class="w-6 self-center dark:text-lime-900"></Plus>
        </button>
      </div>
    </div>

    <div class="relative rounded-b bg-slate-900" ref="codeDom">
      <Monaco
        :editable="editor.isEditable"
        :readOnly="!editor.isEditable"
        :content="content"
        :language="activatedItem.language"
        :runnable="activatedItem.runnable"
        :showRunButton="node.attrs.run == 1"
        :onContentChanged="handleContentChanged"
        :onDelete="handleDelete"
        :onRunnableChanged="handleRunnableChanged"
        :onLanguageChanged="handleLanguageChanged"
        :showLineNumbers="true"
      ></Monaco>

      <!-- 代码框，存储从文件系统读出的代码，然后放到Monaco编辑器中 -->
      <NodeViewContent ref="nodeViewContent" class="hidden" />
    </div>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Monaco from "./MonacoBox.vue";
import { Database, CodeBlock } from "./Database";
import { ref, computed, nextTick } from "vue";
import Plus from "./plus.vue";
import MonacoBox from "./MonacoBox";

const props = defineProps(nodeViewProps);

let codeDom = ref();
let titlesDom = ref();
let database = computed<Database>(() => new Database(props.node.attrs.database));
let items = computed<CodeBlock[]>(() => database.value.items);
let activatedIndex = computed(() => database.value.activatedIndex);
let activatedItem = computed(() => items.value[activatedIndex.value]);
let content = ref(activatedItem.value.content);

function createTab() {
  props.updateAttributes({
    database: database.value.appendNewCodeBlock().toJSON(),
  });
  activate(database.value.getLastIndex());
  nextTick(focusToLastTitle);
}

function activate(index) {
  if (index == activatedIndex.value) return;
  console.log("激活标签下标", index);
  props.updateAttributes({
    database: database.value.updateActivatedIndex(index).toJSON(),
  });
  content.value = items.value[index].content;
}

function handleContentChanged(editorBox) {
  // console.log("code editor found monaco content changed");

  // 异步更新，避免影响Monaco的响应速度
  setTimeout(() => {
    props.updateAttributes({
      code: editorBox.getContent(),
      database: database.value.updateContent(editorBox.getContent()).toJSON(),
    });
  }, 5);
}

function handleLanguageChanged(editorBox: MonacoBox) {
  props.updateAttributes({
    database: database.value.updateLanguage(editorBox.getLanguage()).toJSON(),
  });
}

function handleRunnableChanged(runnable: boolean) {
  props.updateAttributes({
    database: database.value.updateRunnable(runnable).toJSON(),
  });
}

function handleDelete() {
  if (items.value.length == 1) return props.deleteNode();

  props.updateAttributes({
    database: database.value.deleteCodeBlock(activatedIndex.value).toJSON(),
  });

  nextTick(focusToLastTitle);
  activate(database.value.getLastIndex());
}

function handleUpdateTitle(e) {
  props.updateAttributes({
    database: database.value.updateTitle(e.target.innerText).toJSON(),
  });
}

function focusToLastTitle() {
  let titleTexts = titlesDom.value.querySelectorAll(".code-title");
  let lastTitle = titleTexts[titleTexts.length - 1];

  // 光标移到最后一个标签的内容的最后
  lastTitle.focus(); // 聚焦到元素
  const range = document.createRange(); // 创建一个 Range 对象
  range.selectNodeContents(lastTitle); // 设置 Range 对象的范围为元素的内容
  range.collapse(false); // 将 Range 对象的结束位置设置为最后一个字符的位置
  const selection = window.getSelection(); // 获取 Selection 对象
  selection?.removeAllRanges(); // 删除所有 Range 对象
  selection?.addRange(range); // 添加设置好的 Range 对象
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
