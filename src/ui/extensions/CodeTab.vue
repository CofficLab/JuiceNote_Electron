<template>
  <node-view-wrapper class="relative flex flex-row overflow-auto rounded">
    <div v-if="tabOperatorsVisible" class="fixed z-50" @mouseenter="hoverOperatorBar" @mouseleave="leaveOperatorBar" v-bind:style="{ left: x + 'px', top: y + 'px' }">
      <button v-if="editable" class="btn-xs btn" @click="deleteTab(hoveredTabIndex)">
        <Trash class="h-4 w-4 text-red-400"></Trash>
      </button>
    </div>

    <div class="flex w-full flex-col shadow-sm">
      <!-- 标题标签 -->
      <div class="tabs flex flex-row justify-between overflow-hidden rounded-none bg-yellow-600 p-0" contenteditable="false" v-if="titles.length > 1 || editable">
        <!-- 标签列表 -->
        <div class="flex w-5/6 max-w-max flex-grow flex-row gap-px overflow-x-scroll overscroll-none bg-gray-800" ref="titlesDom">
          <div v-for="(title, index) in titles" class="flex h-8 flex-row flex-nowrap items-stretch outline-none" :class="{ 'bg-gray-800': current == index, 'bg-gray-700': current != index }">
            <a
              class="code-title"
              @mouseenter="(e) => setHoveredTabIndex(e, index)"
              @mouseleave="leaveTab"
              :contenteditable="editable"
              :data-index="index"
              @click="activate(index)"
              @keyup="(event) => save(event)"
              >{{ title }}</a
            >
          </div>
        </div>

        <!-- 标签操作栏 -->
        <div class="flex w-1/6 max-w-max justify-end border-l border-l-lime-950/30 shadow-2xl">
          <button v-if="editable" class="btn-ghost btn-sm btn rounded-none" @click="add">
            <Plus class="w-6 self-center"></Plus>
          </button>
        </div>
      </div>

      <node-view-content ref="contents" :data-current="current" class="code-editor-container bg-red-400/40 p-0"></node-view-content>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import { Node } from "../../models/Node";
import Plus from "../assets/icons/plus.svg";
import Trash from "../assets/icons/trash.svg";
import { useRoute } from "vue-router";
import { computed, ref, nextTick } from "vue";

const props = defineProps(nodeViewProps);
const route = useRoute();
const contents = ref();
const titlesDom = ref();
const editable = computed(() => route.name == "lessons.edit");
const current = computed(() => props.node.attrs.current);
const titles = computed<string[]>(() => props.node.attrs.titles.split(","));
const currentLanguage = computed(() => {
  let book = Node.find(parseInt(route.params.id.toString())).getBook();
  return book.title.toLowerCase();
});

const activate = function (index) {
  // console.log("激活标签", index);
  props.editor.storage.codeTab.current = index;
  props.updateAttributes({
    current: index,
  });
};

// 单个标签对应的操作栏
let tabOperatorsVisible = ref(false);
let x = ref(0);
let y = ref(0);
let hoveredTabIndex = ref(-1);
let hoveredOperatorBar = ref(false);

const hoverOperatorBar = function () {
  hoveredOperatorBar.value = true;
};

const leaveOperatorBar = function () {
  hoveredOperatorBar.value = false;

  setTimeout(hideOperatorBarIfNecessary, 1000);
};

const leaveTab = () => {
  hoveredTabIndex.value = -1;

  setTimeout(hideOperatorBarIfNecessary, 1000);
};

const hideOperatorBarIfNecessary = function() {
  console.log("是否hover操作栏", hoveredOperatorBar.value, "是否hovered tab", hoveredTabIndex.value);
    if (!hoveredOperatorBar.value && hoveredTabIndex.value == -1) tabOperatorsVisible.value = false;
}

const setHoveredTabIndex = function (e, index) {
  hoveredTabIndex.value = index;
  x.value = e.target.getBoundingClientRect().x;
  y.value = e.target.getBoundingClientRect().y - e.target.getBoundingClientRect().height - 2;
  tabOperatorsVisible.value = true;
};

const add = function () {
  let position = props.getPos();
  let scrollTop = document.querySelector("main")?.scrollTop;
  console.log("当前CodeTab的position", position);
  console.log("当前光标位置", props.editor.state.selection.head);
  console.log("当前已滚动的距离", scrollTop);

  let index = titles.value.length;
  props.updateAttributes({
    titles: props.node.attrs.titles + ",新标签",
  });
  let dom = document.createElement("pre");
  dom.setAttribute("index", index.toString());
  dom.innerHTML = "<code language=" + currentLanguage.value + ">新标签的内容</code>";
  contents.value.$el.append(dom);
  props.updateAttributes({
    current: index,
  });

  // 光标移动到新建的标签
  nextTick(focusToLastTitle);
};

// 删除一个标签及该标签对应的内容
const deleteTab = function (index) {
  console.log("删除下标为", index, "的标签及内容");

  let children = contents.value.$el.children;

  if (children == null) {
    return console.log("该CodeTab下没有CodeEditor，删除结束");
  }

  // 如果只剩一个CodeEditor，删除整个CodeTab
  if (children.length == 1) {
    return props.deleteNode();
  }

  // 删除对应的CodeEditor
  children.item(index)?.remove();

  // 删除刚才删除的CodeEditor对应的title，并更新current为第一个
  let titles = props.node.attrs.titles.split(",");
  titles.splice(index, 1);
  props.updateAttributes({
    titles: titles.join(","),
    current: 0,
  });

  // 光标移动到最后一个标签
  nextTick(focusToLastTitle);

  // 隐藏单个标签的操作栏
  tabOperatorsVisible.value = false;
  hoveredOperatorBar.value = false;

  // props.editor.commands.focus(position);
};

const save = function (event) {
  let target = event.target;
  console.log("保存title名称", target);

  let titles = props.node.attrs.titles.split(",");
  titles[current.value] = target.innerHTML;
  props.updateAttributes({
    titles: titles.join(","),
  });
};

const focusToLastTitle = function () {
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
};
</script>

<style lang="postcss" scoped>
.code-title {
  @apply tab min-w-max max-w-xl flex-grow flex-nowrap whitespace-nowrap rounded-none text-gray-500 no-underline outline-none  focus-visible:outline-none dark:text-gray-200;
}
</style>
