<template>
  <div>
    <div class="relative">
      <span v-html="lan" class="absolute right-0 top-0 z-20 rounded-bl-lg bg-cyan-800/20 px-2 py-1 text-sm text-info"></span>
      <button contenteditable="false" class="btn-sm btn absolute bottom-8 right-2 z-20 transition-none" :class="{ loading: running }" @click="handleRun" v-html="runTitle" v-if="runnable"></button>

      <div ref="codeDom" class="relative z-10">
        <!-- 操作栏 -->
        <div class="code-block-operators absolute bottom-0" contenteditable="false">
          <div class="flex">
            <button class="btn-ghost btn-sm btn flex self-start rounded-none" @click="deleteSelf">
              <Trash class="h-4 w-4"></Trash>
            </button>
          </div>
          <div class="flex justify-end">
            <button v-bind:data-clipboard-text="code" class="copy justify-end self-end justify-self-end">复制代码</button>
            <button @click="handleToggleRun" v-html="runnable ? '关运行' : '开运行'" class="justify-end self-end justify-self-end"></button>
            <select name="language" @change="handleChangeLanguage" class="text-sm">
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
        </div>
      </div>
    </div>

    <!-- 展示运行结果 -->
    <div ref="resultDom" v-show="runResultVisible" class="result-dom border-2 border-transparent border-t-sky-900"></div>
  </div>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { computed, onMounted, onUnmounted, watch, ref, nextTick } from "vue";
import Trash from "../icons/trash.vue";
import Preload from "../entities/Preload";
import EditorBox from "../entities/EditorBox";
import ClipboardJS from "clipboard";
import Toast from "../entities/Toast";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  Toast.set("已将源码复制到剪贴板");
});

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  // 如果为0，则自动判断；如果大于0，则固定高度
  height: {
    type: Number,
    default: 0,
  },
  runable: {
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
  keyUpCallback: {
    type: Function,
    default: null,
  },
  showLineNumbers: {
    type: Boolean,
    default: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
});

/**
 * 运行按钮相关的属性
 */
let code = ref("");
let runnable = ref(true);
let running = ref(false);
let runResultVisible = ref(false);
let runTitle = computed(() => {
  if (running.value) return "运行中";
  if (runResultVisible.value) return "收起";
  return "运行";
});

/**
 * editor相关属性
 */
let codeDom = ref<HTMLDivElement>();
let resultDom = ref<HTMLDivElement>();
let editorBox: EditorBox;
let resultBox: EditorBox;
let lan = ref(props.language);

onMounted(() => {
  createWorker();

  // 编辑器
  editorBox = EditorBox.createEditor(props, codeDom.value!)
    .onChanged((content) => {
      props.keyUpCallback(content);
    })
    .onLanguageChanged((language) => {
      lan.value = language;
    });

  // 展示运行结果的编辑器
  resultBox = EditorBox.createEditor(props, resultDom.value!);
});

onUnmounted(() => {
  console.log("monaco component unmounted");
});

watch(props, () => {
  console.log("monaco 检测到 props 发生变化");
  editorBox.setLanguage(props.language);
  editorBox.setContent(props.code);
});

/**
 * 处理页面点击事件
 */
let handleChangeLanguage = (e) => {
  editorBox.setLanguage(e.target.value);
};
let handleToggleRun = () => {
  runnable.value = !runnable.value;
};
let handleRun = () => {
  if (running.value) return;

  // 收起结果
  if (runResultVisible.value) {
    runResultVisible.value = false;
    running.value = false;
    return;
  }

  running.value = true;

  setTimeout(() => {
    let result = Preload.ipc.sendSync("run", editorBox.getContent(), editorBox.getLanguage());
    console.log(result);
    resultBox.setContent(result);
    running.value = false;
    runResultVisible.value = true;
    console.log(editorBox.getLinesHeight());
  }, 0);
};

function createWorker() {
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
}
</script>
