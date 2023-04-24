<template>
  <div>
    <div class="relative">
      <span v-html="lan" v-if="!editable" class="absolute right-0 top-0 z-20 rounded-bl-lg bg-cyan-800/20 px-2 py-1 text-sm text-info"></span>
      <button contenteditable="false" class="btn-sm btn absolute bottom-8 right-2 z-20 transition-none" :class="{ loading: running }" @click="handleRun" v-html="runTitle" v-if="runable"></button>

      <div ref="codeDom" class="relative z-10"></div>

      <!-- 展示运行结果 -->
      <div ref="resultDom" v-show="runResultVisible" class="border-2 border-transparent border-t-sky-900"></div>

      <!-- 操作栏 -->
      <div class="code-block-operators absolute bottom-0" contenteditable="false">
        <div class="flex">
          <button class="btn-ghost btn-sm btn flex self-start rounded-none" @click="deleteSelf">
            <Trash class="h-4 w-4"></Trash>
          </button>
        </div>
        <div class="flex justify-end">
          <button v-bind:data-clipboard-text="code" class="copy justify-end self-end justify-self-end">复制代码</button>
          <button @click="handleToggleRun" v-html="runable ? '关运行' : '开运行'" class="justify-end self-end justify-self-end"></button>
          <select name="language" @change="handleChangeLanguage">
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
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { computed, onMounted, onUnmounted, watch, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import Trash from "../icons/trash.vue";
import Preload from "../entities/Preload";
import EditorBox from "../entities/EditorBox";

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
});

/**
 * 运行按钮相关的属性
 */
let code = ref("");
let runable = ref(true);
let running = ref(false);
let runResultVisible = ref(false);
let runTitle = computed(() => {
  if (running.value) return "运行中";
  if (runResultVisible.value) return "收起";
  return "运行";
});

var index = 0; // 当前editor是整个页面的第几个editor，从0开始

let resultEditorIndex = 0;
let language = ref(props.language);

let codeDom = ref<HTMLDivElement>();
let resultDom = ref<HTMLDivElement>();
let editorBox: EditorBox;
let resultBox: EditorBox;
let lan = ref(props.language);

let editable = computed(() => useRoute().query.editable);

onMounted(() => {
  createWorker();
  editorBox = createEditor(props, codeDom.value!)
    .onCreated((editor) => {
      setHeight(props, editor, codeDom.value);
    })
    .onChanged((content) => {
      props.keyUpCallback(content);
    })
    .onLanguageChanged((language) => {
      lan.value = language;
    });

  resultBox = createEditor(props, resultDom.value!).onChanged((content, editor) => setHeight(props, editor, resultDom.value));
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
  runable.value = !runable.value;
};
let handleRun = () => {
  if (running.value) return;

  // 收起结果
  if (runResultVisible.value) {
    runResultVisible.value = false;
    running.value = false;

    codeDom.value!.style.height = parseInt(codeDom.value!.style.height) * 2 + "px";
    resultDom.value!.style.height = 0 + "px";
    return;
  }

  running.value = true;

  setTimeout(() => {
    let result = Preload.ipc.sendSync("run", editorBox.getContent(), editorBox.getLanguage());
    console.log(result);
    resultBox.setContent(result);
    running.value = false;
    runResultVisible.value = true;

    resultDom.value!.style.height = parseInt(resultDom.value!.style.height) / 2 + "px";
    codeDom.value!.style.height = parseInt(codeDom.value!.style.height) / 2 + "px";
  }, 0);
};
</script>

<script lang="ts">
function setHeight(props, editor, target) {
  let height = getEditorHeight(props, editor);
  target.style.height = height + "px";
}

function getEditorHeight(props, editor: monaco.editor.IStandaloneCodeEditor) {
  // 如果设置了高度，则固定高度
  if (props.height > 0) {
    console.log("monaco editor 收到了props传递的高度", props.height);

    return props.height;
  }

  let lineCount = editor.getModel()!.getLineCount();
  let lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
  let padding = editor.getOption(monaco.editor.EditorOption.padding);
  return lineCount * lineHeight + padding.top + padding.bottom;
}

function createEditor(props, target: HTMLDivElement) {
  let editor = monaco.editor.create(target, {
    value: props.code,
    language: props.language,
    readOnly: props.readOnly,
    theme: "vs-dark",
    fontSize: 14,
    lineNumbers: props.showLineNumbers ? "on" : "off",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    contextmenu: false,
    tabSize: 4,
    roundedSelection: false,
    renderLineHighlight: "none",
    formatOnPaste: true,
    scrollbar: {
      vertical: "hidden",
      horizontal: "hidden",
      alwaysConsumeMouseWheel: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    domReadOnly: false,
    stickyScroll: {
      enabled: false,
    },
    padding: {
      top: 10,
      bottom: 50,
    },
    minimap: { enabled: false },
  });

  return new EditorBox(editor, monaco.editor.getModels().length - 1);
}

// 用来展示运行结果的 Monaco Editor
function setResultEditor(target: HTMLDivElement) {
  return monaco.editor.create(target, {
    language: "shell",
    readOnly: true,
    fontSize: 14,
    lineNumbers: "on",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    contextmenu: false,
    roundedSelection: false,
    renderLineHighlight: "none",
    scrollbar: { alwaysConsumeMouseWheel: false },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    domReadOnly: true,
    padding: { top: 10, bottom: 50 },
    minimap: { enabled: false },
  });
}

// 设置一个 monaco 实例的 language
function setLanguage(editor: monaco.editor.IStandaloneCodeEditor | null, language: string) {
  console.log("设置Monaco Editor的Language为", language);

  if (editor == undefined) {
    return console.log("editor尚未实例化，不能设置language");
  }

  monaco.editor.setModelLanguage(editor.getModel()!, language);
}

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

function setOnChange(props, editor: monaco.editor.IStandaloneCodeEditor, index: Number, callback) {
  editor.getModel()!.onDidChangeContent(() => {
    // 使用 this.editor.getValue() 会导致整个界面卡住
    // https://github.com/microsoft/monaco-editor/issues/2439
    let content = monaco.editor.getModels()[index.toString()].getValue();

    callback();
  });

  return editor;
}

// 处理改变language事件
function handleChangeLanguage(event, editor) {
  let language = event.target.value;

  setLanguage(editor, language);
}
</script>
