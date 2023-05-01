<template>
  <div>
    <div class="relative">
      <div ref="codeDom" class="relative z-10 h-96"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch, ref } from "vue";
import MonacoBox from "./MonacoBox";
import ClipboardJS from "clipboard";
import Toast from "../../entities/Toast";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  Toast.set("已将源码复制到剪贴板");
});

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  // 如果为0，则自动判断；如果大于0，则固定高度
  height: {
    type: Number,
    default: 0,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  runnable: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  showRunButton: {
    type: Boolean,
    default: false,
  },
  onContentChanged: {
    type: Function,
    default: () => {
      console.log("monaco content changed");
    },
  },
  onDelete: {
    type: Function,
    default: () => {
      console.log("monaco delete button clicked");
    },
  },
  onRunnableChanged: {
    type: Function,
    default: () => {
      console.log("monaco runnable changed");
    },
  },
  onLanguageChanged: {
    type: Function,
    default: () => {
      console.log("monaco language changed");
    },
  },
  showLineNumbers: {
    type: Boolean,
    default: true,
  },
});

/**
 * 运行按钮相关的属性
 */
let runnable = ref(false);
let running = ref(false);
let runResultVisible = ref(false);
let runTitle = computed(() => (running.value ? "运行中" : runResultVisible.value ? "收起" : "运行"));

/**
 * editor相关属性
 */
let codeDom = ref<HTMLDivElement>();
let resultDom = ref<HTMLDivElement>();
let editorBox = ref<MonacoBox>();
let resultBox: MonacoBox;
let lan = ref();

onMounted(() => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker();
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

  window.createMonaco({
    target: codeDom.value!,
    language: props.language,
    content: props.content,
    onCreate(monacoBox) {
      lan.value = monacoBox.getLanguage();
      runnable.value = monacoBox.getRunnable();
      // codeForCopy.value = monacoBox.getContent();
    },
    onContentChanged(monacoBox) {
      props.onContentChanged(monacoBox);
      // codeForCopy.value = monacoBox.getContent();
    },
    onRunnableChanged(v: boolean) {
      props.onRunnableChanged(v);
      runnable.value = v;
    },
    onLanguageChanged(editorBox) {
      lan.value = editorBox.getLanguage();
      props.onLanguageChanged(editorBox);
    },
  });
});

onUnmounted(() => {
  // console.log("monaco component unmounted");
});

watch(
  () => props.content,
  () => {
    console.log("monaco 检测到 props.content 发生变化");
    editorBox.value!.setContent(props.content);
  }
);

watch(
  () => props.language,
  () => {
    console.log("monaco 检测到 props.language 发生变化");
    editorBox.value!.setLanguage(props.language);
  }
);
</script>
