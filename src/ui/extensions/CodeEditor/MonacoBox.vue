<template>
  <div>
    <div class="relative">
      <!-- 语言 -->
      <span v-html="lan" class="absolute right-0 top-0 z-20 rounded-bl-lg bg-cyan-800/20 px-2 py-1 text-sm text-info"></span>

      <!-- 运行按钮 -->
      <button contenteditable="false" class="btn-sm btn absolute bottom-8 right-2 z-20 transition-none" :class="{ loading: running }" @click="handleRun" v-html="runTitle" v-show="runnable"></button>

      <div ref="codeDom" class="relative z-10">
        <!-- 操作栏 -->
        <div class="code-block-operators absolute bottom-0" contenteditable="false" v-if="editable">
          <div class="flex">
            <button class="btn-ghost btn-sm btn flex self-start rounded-none" @click="() => onDelete()">
              <Trash class="h-4 w-4"></Trash>
            </button>
          </div>
          <div class="flex justify-end">
            <button v-bind:data-clipboard-text="codeForCopy" class="copy justify-end self-end justify-self-end">复制代码</button>
            <button @click="handleToggleRun" v-html="runnable ? '关运行' : '开运行'" class="justify-end self-end justify-self-end"></button>
            <select name="language" @change="handleChangeLanguage" class="text-sm">
              <option value="text" v-bind:selected="lan == 'text'">纯文本</option>
              <option value="html" v-bind:selected="lan == 'html'">HTML</option>
              <option value="go" v-bind:selected="lan == 'go'">Golang</option>
              <option value="php" v-bind:selected="lan == 'php'">PHP</option>
              <option value="javascript" v-bind:selected="lan == 'javascript'">JavaScript</option>
              <option value="java" v-bind:selected="lan == 'java'">Java</option>
              <option value="python" v-bind:selected="lan == 'python'">Python</option>
              <option value="shell" v-bind:selected="lan == 'shell'">Shell</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 展示运行结果 -->
    <div ref="resultDom" v-show="runResultVisible && runnable" class="result-dom border-2 border-transparent border-t-sky-900"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch, ref } from "vue";
import Trash from "./trash.vue";
import Preload from "../../entities/Preload";
import MonacoBox from "./MonacoBox";
import ClipboardJS from "clipboard";
import Toast from "../../entities/Toast";

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

// 复制按钮相关的属性
let codeForCopy = ref();

onMounted(() => {
  // 编辑器
  MonacoBox.createEditor(editorBox.value!, {
    content: props.content,
    target: codeDom.value!,
    language: props.language,
    onCreated(monacoBox) {
      lan.value = monacoBox.getLanguage();
      runnable.value = monacoBox.getRunnable();
      codeForCopy.value = monacoBox.getContent();

      editorBox.value = monacoBox;
    },
    onContentChanged(monacoBox) {
      props.onContentChanged(monacoBox);
      codeForCopy.value = monacoBox.getContent();
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

  console.log(editorBox.value);

  // 展示运行结果的编辑器
  MonacoBox.createEditor(resultBox, {
    content: "",
    target: resultDom.value!,
    language: props.language,
    runnable: props.runnable,
    onCreated: (monacoBox) => {
      resultBox = monacoBox;
    },
  });
});

onUnmounted(() => {
  console.log("monaco component unmounted");
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

/**
 * 处理页面点击事件
 */
let handleChangeLanguage = (e) => editorBox.value!.setLanguage(e.target.value);
let handleToggleRun = () => {
  editorBox.value!.toggleRunnable();
  if (!editorBox.value!.runnable) runResultVisible.value = false;
};
let handleRun = () => {
  if (running.value) return;

  // 收起结果
  if (runResultVisible.value) {
    runResultVisible.value = false;
    running.value = false;
    resultBox.setContent("");
    return;
  }

  running.value = true;

  setTimeout(() => {
    let result = Preload.ipc.sendSync("run", editorBox.value?.getContent(), editorBox.value?.getLanguage());
    resultBox.setContent(result == "" ? "「程序没有输出」" : result);
    // console.log("运行结果", result);
    running.value = false;
    runResultVisible.value = true;
  }, 500);
};
</script>
