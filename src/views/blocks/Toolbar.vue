<template>
  <div id="toolbar">
    <div class="dropdown-hover dropdown">
      <label tabindex="0"><IconBars2></IconBars2></label>
      <ul tabindex="0" class="dropdown-content">
        <li @click="toggleHeading(1)" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">H1</li>
        <li @click="toggleHeading(2)" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">H2</li>
        <li @click="toggleHeading(3)" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">H3</li>
        <li @click="toggleHeading(4)" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">H4</li>
        <li @click="toggleBold" :disabled="!canToggleBold" :class="{ 'is-active': isBoldActive }">加粗</li>
        <li @click="toggleItalic" :disabled="!canToggleItalic" :class="{ 'is-active': editor.isActive('italic') }">斜体</li>
        <li @click="toggleStrike" :disabled="!canToggleStrike" :class="{ 'is-active': editor.isActive('strike') }">划线</li>
        <li @click="toggleBlockquote" :class="{ 'is-active': isBlockQuoteActive }">引用</li>
        <li @click="setParagraph()" :class="{ 'is-active': isParagraphActive }">正文</li>
      </ul>
    </div>

    <div class="dropdown-hover dropdown">
      <label tabindex="0"><IconPuzzle></IconPuzzle></label>
      <ul tabindex="0">
        <li @click="toggleBanner" :class="{ 'is-active': editor.isActive('banner') }">提示框</li>
        <li @click="toggleBrick" :class="{ 'is-active': editor.isActive('brick') }">砖块</li>
        <li @click="toggleTimeLineTitle" :class="{ 'is-active': editor.isActive('time-line-title') }">时间线标题</li>
        <li @click="toggleOfficialLink" :class="{ 'is-active': editor.isActive('official-link') }">官网</li>

        <li @click="toggleCode">行内代码</li>
      </ul>
    </div>

    <button @click="editor.chain().focus().setHorizontalRule().run()"><IconMinus></IconMinus></button>
    <button @click="editor.chain().focus().setHardBreak().run()"><IconBarsArrowDown></IconBarsArrowDown></button>
    <button @click="insertNewLine"><IconBarsArrowDown></IconBarsArrowDown></button>
    <button @click="editor.chain().focus().addChat().run()" class="tooltip tooltip-bottom" data-tip="对话框">
      <IconChat></IconChat>
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()" class="tooltip tooltip-bottom" data-tip="清除格式">
      <IconX></IconX>
    </button>
    <button @click="editor.chain().focus().clearNodes().run()" class="tooltip tooltip-bottom" data-tip="清除节点">
      <IconClear></IconClear>
    </button>

    <div class="dropdown-hover dropdown">
      <label tabindex="0"><IconListBullet></IconListBullet></label>
      <ul tabindex="0">
        <li @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          <IconListBullet></IconListBullet>
        </li>
        <li @click="editor.chain().focus().splitListItem('listItem').run()" :disabled="!editor.can().splitListItem('listItem')">splitListItem</li>
        <li @click="editor.chain().focus().sinkListItem('listItem').run()" :disabled="!editor.can().sinkListItem('listItem')">sinkListItem</li>
        <li @click="editor.chain().focus().liftListItem('listItem').run()" :disabled="!editor.can().liftListItem('listItem')">liftListItem</li>
        <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">有序列表</button>
      </ul>
    </div>

    <div class="dropdown-hover dropdown-bottom dropdown">
      <label tabindex="0"><IconTable></IconTable></label>
      <ul tabindex="0">
        <li>
          <a @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"> 插入表格 </a>
        </li>
        <li @click="editor.chain().focus().addColumnBefore().run()">在前面插入一列</li>
        <li @click="editor.chain().focus().addColumnAfter().run()">在后面插入一列</li>
        <li @click="editor.chain().focus().deleteColumn().run()">删除这一列</li>
        <li @click="editor.chain().focus().addRowBefore().run()">在前面插入一行</li>
        <li @click="editor.chain().focus().addRowAfter().run()">在后面插入一行</li>
        <li @click="editor.chain().focus().deleteRow().run()">删除一行</li>
        <li @click="editor.chain().focus().deleteTable().run()">删除表格</li>
        <li @click="editor.chain().focus().mergeCells().run()">合并单元格</li>
        <li @click="editor.chain().focus().splitCell().run()">拆分单元格</li>
        <li @click="editor.chain().focus().toggleHeaderColumn().run()">toggleHeaderColumn</li>
        <li @click="editor.chain().focus().toggleHeaderRow().run()">toggleHeaderRow</li>
        <li @click="editor.chain().focus().toggleHeaderCell().run()">toggleHeaderCell</li>
        <li @click="editor.chain().focus().mergeOrSplit().run()">mergeOrSplit</li>
        <li @click="editor.chain().focus().setCellAttribute('colspan', 2).run()">setCellAttribute</li>
        <li @click="editor.chain().focus().fixTables().run()">fixTables</li>
        <li @click="editor.chain().focus().goToNextCell().run()">跳到下一格</li>
        <li @click="editor.chain().focus().goToPreviousCell().run()">跳到上一格</li>
      </ul>
    </div>

    <button @click="inputLink" :class="{ 'is-active': editor.isActive('link') }"><IconLink></IconLink></button>
    <!-- <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">取消链接</button> -->
    <button @click="editor.chain().toggleToc().run()"><IconQueueList></IconQueueList></button>
    <button @click="editor.chain().toggleTimeLine().run()">时间线</button>
    <button @click="editor.chain().focus().addTab().run()">TAB</button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
      <IconCode></IconCode>
    </button>
    <button @click="editor.chain().focus().addCodeTab().run()">CodeBlockTab</button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      <IconBack></IconBack>
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      <IconRedo></IconRedo>
    </button>
    <button @click="toggleSourceCode">源码</button>
    <!-- <button @click="save"><SaveIcon></SaveIcon></button> -->
    <button @click="saveAndShow"><IconSaveBack></IconSaveBack></button>
    <button @click="empty">清空</button>

    <!-- 设置URL的模态框 -->
    <div class="modal" v-bind:class="{ 'modal-open': showLinkModal }">
      <div class="modal-box">
        <label for="my-modal-3" class="btn-sm btn-circle btn absolute right-2 top-2" @click="cancelSetLink">✕</label>
        <h3 class="mb-4 text-lg font-bold">设置链接</h3>
        <input type="text" placeholder="输入URL" class="input-bordered input w-full" v-model="url" />
        <div class="modal-action">
          <label for="my-modal" class="btn" @click="setLink">确定</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import NodeController from "../../controllers/NodeController";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";
import SaveIcon from "../../assets/icons/inbox-arrow-down.svg";
import IconCode from "../../assets/icons/code-bracket.svg";
import IconListBullet from "../../assets/icons/list-bullet.svg";
import IconBack from "../../assets/icons/arrow-uturn-left.svg";
import IconRedo from "../../assets/icons/arrow-uturn-right.svg";
import IconLink from "../../assets/icons/link.svg";
import IconTable from "../../assets/icons/table-cells.svg";
import IconMinus from "../../assets/icons/minus.svg";
import IconX from "../../assets/icons/x-mark.svg";
import IconBarsArrowDown from "../../assets/icons/bars-arrow-down.svg";
import IconClear from "../../assets/icons/no-symbol.svg";
import IconPuzzle from "../../assets/icons/puzzle-pieces.svg";
import IconBars2 from "../../assets/icons/bars-2.svg";
import IconSaveBack from "../../assets/icons/arrow-up-tray.svg";
import IconQueueList from "../../assets/icons/queue-list.svg";
import IconChat from "../../assets/icons/chat-bubble-left-ellipsis.svg";

const props = defineProps({
  editor: { type: Editor, required: true },
  current: { type: Node },
  sourceCodeCallback: null,
});

let showLinkModal = false;
let url = ""; // 设置链接扩展用到的，记录用户输入的URL
let canToggleBold = computed(() => {
  return props.editor.can().chain().focus().toggleBold().run();
});
let canToggleItalic = computed(() => {
  return props.editor.can().chain().focus().toggleItalic().run();
});
let canToggleStrike = computed(() => {
  return props.editor.can().chain().focus().toggleStrike().run();
});
let isBoldActive = computed(() => {
  return props.editor.isActive("bold");
});
let isBlockQuoteActive = computed(() => {
  return props.editor.isActive("blockquote");
});
let isParagraphActive = computed(() => {
  return props.editor.isActive("paragraph");
});
let isCodeActive = computed(() => {
  return props.editor.isActive("code");
});

let empty = function () {
  ToastController.set(NodeController.updateContent(props.current, ""));
};
let save = function () {
  ToastController.set(NodeController.updateContent(this.current, this.editor.getHTML()));
};

let saveAndShow = function () {
  save();
  NodeController.toggleEditable();
};

let insertNewLine = function () {
  props.editor.commands.setContent(props.editor.getHTML() + "<p>type here</p>");
  props.editor.commands.focus("end");
};

let setParagraph = function () {
  props.editor.chain().focus().setParagraph().run();
};

let toggleBanner = function () {
  props.editor.chain().focus().toggleBanner().run();
};

let toggleBrick = function () {
  props.editor.chain().focus().toggleBrick().run();
};

let toggleTimeLineTitle = function () {
  props.editor.chain().focus().toggleTimeLineTitle().run();
};
let toggleBold = function () {
  props.editor.chain().focus().toggleBold().run();
};

let toggleHeading = function (level = 0) {
  props.editor.chain().focus().toggleHeading({ level: level }).run();
};
let toggleItalic = function () {
  props.editor.chain().focus().toggleItalic().run();
};
let toggleStrike = function () {
  props.editor.chain().focus().toggleStrike().run();
};
let toggleCode = function () {
  props.editor.chain().focus().toggleCode().run();
};
let toggleOfficialLink = function () {
  props.editor.chain().focus().toggleOfficialLink().run();
};
let toggleBlockquote = function () {
  props.editor.chain().focus().toggleBlockquote().run();
};
let toggleSourceCode = function () {
  props.sourceCodeCallback();
};
let inputLink = function () {
  props.showLinkModal = true;
};
let cancelSetLink = function () {
  props.showLinkModal = false;
};
let setLink = function () {
  props.showLinkModal = false;
  const previousUrl = props.editor.getAttributes("link").href;
  const url = props.url ?? previousUrl;

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    props.editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  props.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
};
</script>

<style scoped lang="postcss">
#toolbar {
  @apply flex flex-row items-center;
}

label {
  @apply btn-ghost btn-sm btn m-1;
}

button {
  @apply btn-ghost btn-sm btn mx-1;

  svg {
    @apply my-auto;
  }
}

.bubble-menu button,
.floating-menu button {
  @apply btn-sm btn mx-1 rounded-none;
}

ul {
  @apply dropdown-content rounded-box flex max-h-96 w-52 flex-col gap-4 overflow-hidden overflow-y-scroll bg-base-100 p-2 py-4 shadow;

  li {
    @apply btn;
  }
}
</style>
