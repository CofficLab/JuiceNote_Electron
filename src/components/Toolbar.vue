<template>
  <div>
    <div class="dropdown-hover dropdown">
      <label tabindex="0" class="btn-sm btn m-1">格式</label>
      <ul tabindex="0" class="dropdown-content menu rounded-box flex w-52 justify-center bg-base-100 p-2 shadow">
        <li>
          <a
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            h1
          </a>
        </li>
        <li>
          <a
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            h2
          </a>
        </li>
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
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      代码块
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      toggleBulletList
    </button>
    <button
      @click="editor.chain().focus().splitListItem('listItem').run()"
      :disabled="!editor.can().splitListItem('listItem')"
    >
      splitListItem
    </button>
    <button
      @click="editor.chain().focus().sinkListItem('listItem').run()"
      :disabled="!editor.can().sinkListItem('listItem')"
    >
      sinkListItem
    </button>
    <button
      @click="editor.chain().focus().liftListItem('listItem').run()"
      :disabled="!editor.can().liftListItem('listItem')"
    >
      liftListItem
    </button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      取消
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      恢复
    </button>
    <button @click="save">保存</button>
  </div>
</template>

<script lang="ts">
import { writeFileSync } from "fs";
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";

export default defineComponent({
  props: ["editor"],

  data() {
    return {
      showLinkModal: false,
      url: "", // 设置链接扩展用到的，记录用户输入的URL
    };
  },

  methods: {
    save() {
      let current = RouteController.getCurrentPage();
      writeFileSync(current.path.replace(".md", ".html"), this.editor.getHTML());
      ToastController.set("已保存");
      RouteController.toggleEditMode();
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
  @apply btn-sm btn;
}

.bubble-menu button,
.floating-menu button {
  @apply btn-sm btn mx-1 rounded-none;
}
</style>
