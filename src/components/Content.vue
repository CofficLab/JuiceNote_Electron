<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div
      v-if="editor && editable"
      class="sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/50 shadow-2xl"
    >
      <Toolbar :editor="editor"></Toolbar>
    </div>

    <!-- TAB -->
    <div class="tabs mt-4 flex w-full justify-center bg-yellow-400/10" v-if="current.getParent().isTab()">
      <Link v-for="sibling in siblings" :href="sibling.id" class="tab tab-lifted">{{ sibling.name }}</Link>
    </div>

    <!-- 编辑框 -->
    <div
      id="editorx"
      ref="editorx"
      class="mt-1 flex w-full justify-center overflow-auto border-0 p-4 pb-24"
      @contextmenu.prevent="onContextmenu"
      @click="showRightMenu = false"
    >
      <editor-content :editor="editor" class="prose w-full xl:prose-lg" />
    </div>

    <!-- 右键菜单 -->
    <ul
      class="menu z-50 w-56 rounded-md bg-base-100 shadow-sm"
      v-if="showRightMenu"
      v-bind:style="{ left: rightMenuX + 'px', top: rightMenuY + 'px', position: 'fixed' }"
    >
      <li><a @click="refresh">刷新</a></li>
      <li><a @click="edit">编辑</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
</template>

<script>
import { Editor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";
import RouteController from "../controllers/RouteController";
import Extensions from "../entities/Extensions";
import Link from "./Link.vue";
import Toolbar from "./Toolbar.vue";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    Toolbar,
    Link,
  },
  data() {
    return {
      editor: null,
      currentTab: 0,
      showRightMenu: false,
      rightMenuX: 1000,
      rightMenuY: 1000,
    };
  },
  computed: {
    current: () => RouteController.currentPage,
    editable: () => RouteController.editable,
    siblings() {
      return RouteController.currentPage.siblingsWithCurrent();
    },
    content() {
      return RouteController.currentPage.getSourceCode();
    },
  },
  methods: {
    switchTab(index) {
      console.log("switch tab to", index);
      this.currentTab = index;
    },
    refresh() {
      RouteController.refresh();
      this.showRightMenu = false;
    },
    edit() {
      RouteController.editable = true;
      this.showRightMenu = false;
    },
    onContextmenu(event) {
      console.log("右键单击", event);
      this.rightMenuX = event.clientX + 20;
      this.rightMenuY = event.clientY + 20;
      this.showRightMenu = !this.showRightMenu;
    },
  },
  mounted() {
    console.log("mounted, init the editor");
    this.editor = new Editor({
      content: this.content,
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
      onUpdate: () => {
        console.log("editor updated");
      },
      onRenderTriggered: () => {
        console.log("render triggered");
      },
      onSelectionUpdate: () => {
        console.log("selection update");
      },
      onRenderTracked: () => {
        console.log("render tracked");
      },
    });
  },
  watch: {
    content(value) {
      console.log("content changed");
      this.editor.commands.setContent(value, true);
    },
    editable() {
      console.log("editable changed", this.editable);
      this.editor.setEditable(this.editable);
      this.editor.commands.setContent(RouteController.currentPage.getSourceCode(), false);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
