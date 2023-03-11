<template>
  <div>
    <div class="dropdown-hover dropdown">
      <label tabindex="0">标题</label>
      <ul tabindex="0">
        <li
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </li>
        <li
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </li>
      </ul>
    </div>

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
      </ul>
    </div>

    <div class="dropdown-hover dropdown dropdown-bottom">
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
      取消
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

  methods: {
    save() {
      ToastController.set(NodeController.updateContent(this.current, this.editor.getHTML()));
    },
    saveAndShow() {
      this.save();
      NodeController.toggleEditable();
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
