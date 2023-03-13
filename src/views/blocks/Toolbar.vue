<template>
  <div>
    <div class="dropdown-hover dropdown">
      <label tabindex="0">标题</label>
      <ul tabindex="0">
        <li @click="toggleHeading(1)" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">H1</li>
        <li @click="toggleHeading(2)" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">H2</li>
        <li @click="toggleHeading(3)" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">H3</li>
        <li @click="toggleHeading(4)" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">H4</li>
        <li @click="setParagraph()" :class="{ 'is-active': editor.isActive('paragraph') }">正文</li>
      </ul>
    </div>

    <button @click="toggleBold" :disabled="!canToggleBold" :class="{ 'is-active': isBoldActive }">bold</button>

    <button @click="toggleItalic" :disabled="!canToggleItalic" :class="{ 'is-active': editor.isActive('italic') }">
      italic
    </button>

    <button @click="toggleStrike" :disabled="!canToggleStrike" :class="{ 'is-active': editor.isActive('strike') }">
      strike
    </button>

    <button
      @click="toggleCode"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      code
    </button>

    <button
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      引用
    </button>

    <button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
    <button @click="editor.chain().focus().setHardBreak().run()">hard break</button>

    <button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
    <button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>

    <div class="dropdown-hover dropdown">
      <label tabindex="0">列表</label>
      <ul tabindex="0">
        <li
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          toggleBulletList
        </li>
        <li
          @click="editor.chain().focus().splitListItem('listItem').run()"
          :disabled="!editor.can().splitListItem('listItem')"
        >
          splitListItem
        </li>
        <li
          @click="editor.chain().focus().sinkListItem('listItem').run()"
          :disabled="!editor.can().sinkListItem('listItem')"
        >
          sinkListItem
        </li>
        <li
          @click="editor.chain().focus().liftListItem('listItem').run()"
          :disabled="!editor.can().liftListItem('listItem')"
        >
          liftListItem
        </li>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          有序列表
        </button>
      </ul>
    </div>

    <div class="dropdown-hover dropdown-bottom dropdown">
      <label tabindex="0">表格</label>
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

    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      加粗
    </button>
    <button @click="editor.chain().focus().toggleBanner().run()" :class="{ 'is-active': editor.isActive('banner') }">
      提示框
    </button>
    <button @click="editor.chain().focus().toggleBrick().run()" :class="{ 'is-active': editor.isActive('brick') }">
      砖块
    </button>
    <button
      @click="editor.chain().focus().toggleOfficialLink().run()"
      :class="{ 'is-active': editor.isActive('official-link') }"
    >
      官网
    </button>
    <button @click="inputLink" :class="{ 'is-active': editor.isActive('link') }">设置链接</button>
    <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">取消链接</button>
    <button @click="editor.chain().toggleToc().run()">TOC</button>
    <button @click="editor.chain().focus().addTab().run()">TAB</button>
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      代码块
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">setHardBreak</button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      撤销
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      恢复
    </button>
    <button @click="save">保存</button>
    <button @click="saveAndShow">保存并退出</button>

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

<script lang="ts">
import { Editor } from "@tiptap/vue-3";
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";

export default defineComponent({
  props: {
    editor: { type: Editor, required: true },
    current: { type: Node },
  },

  data() {
    return {
      showLinkModal: false,
      url: "", // 设置链接扩展用到的，记录用户输入的URL
    };
  },

  computed: {
    canToggleBold() {
      return this.editor.can().chain().focus().toggleBold().run();
    },
    canToggleItalic() {
      return this.editor.can().chain().focus().toggleItalic().run();
    },
    canToggleStrike() {
      return this.editor.can().chain().focus().toggleStrike().run();
    },
    isBoldActive() {
      return this.editor.isActive("bold");
    },
  },

  methods: {
    save() {
      ToastController.set(NodeController.updateContent(this.current, this.editor.getHTML()));
    },
    saveAndShow() {
      this.save();
      NodeController.toggleEditable();
    },
    setParagraph() {
      this.editor.chain().focus().setParagraph().run();
    },
    toggleBold() {
      this.editor.chain().focus().toggleBold().run();
    },
    toggleHeading(level: number) {
      this.editor.chain().focus().toggleHeading({ level: level }).run();
    },
    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },
    toggleStrike() {
      this.editor.chain().focus().toggleStrike().run();
    },
    toggleCode() {
      this.editor.chain().focus().toggleCode().run();
    },
    inputLink() {
      this.showLinkModal = true;
    },
    cancelSetLink() {
      this.showLinkModal = false;
    },
    setLink() {
      this.showLinkModal = false;
      const previousUrl = this.editor.getAttributes("link").href;
      const url = this.url ?? previousUrl;

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
  },
});
</script>

<style scoped lang="postcss">
button {
  @apply btn-sm btn mx-1;
}

.bubble-menu button,
.floating-menu button {
  @apply btn-sm btn mx-1 rounded-none;
}

label {
  @apply btn-sm btn m-1;
}

ul {
  @apply dropdown-content rounded-box flex max-h-96 w-52 flex-col gap-4 overflow-hidden overflow-y-scroll bg-base-100 p-2 py-4 shadow;

  li {
    @apply btn;
  }
}
</style>
