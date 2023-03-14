<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container" v-if="editor && editable">
      <Toolbar :editor="editor" :current="current"></Toolbar>
    </div>

    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" :id="sibling.id" class="tab-lifted tab" :node="current">{{
        sibling.title
      }}</Link>
    </div>

    <!-- 编辑框 -->
    <div id="editor-content-container" @contextmenu.prevent="showRightMenu">
      <editor-content :editor="editor" class="prose h-screen w-full overflow-visible xl:prose-lg" />
    </div>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" :event="rightClickEvent">
      <Edit :node="current"></Edit>
      <Rename :node="current"></Rename>
      <CreateChild :node="current"></CreateChild>
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
      <Delete></Delete>
    </RightMenu>
  </div>
</template>

<script lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import Link from "../components/Link.vue";
import RightMenu from "../components/RightMenu.vue";
import Toolbar from "./Toolbar.vue";
import CreateChild from "../operators/CreateChild.vue";
import Copy from "../operators/Copy.vue";
import Edit from "../operators/Edit.vue";
import Rename from "../operators/Rename.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import RightMenuController from "../../controllers/RightMenuController";
import NodeController from "../../controllers/NodeController";
import Delete from "../operators/Delete.vue";

export default {
  components: { CreateChild, Copy, EditorContent, Edit, Toolbar, Rename, Link, RightMenu, Next, Prev, Delete },
  data() {
    return {
      editor: undefined,
      currentTab: 0,
      rightClickEvent: null,
      showToc: false,
      headings: [],
    };
  },
  computed: {
    editable: () => NodeController.getEditable(),
    shouldShowRightMenu: function () {
      return RightMenuController.shouldShow && this.rightClickEvent;
    },
    changed() {
      return { current: this.current, editable: this.editable };
    },
    current: () => NodeController.getCurrentPage(),
  },
  methods: {
    switchTab(index) {
      console.log("switch tab to", index);
      this.currentTab = index;
    },
    showRightMenu(event) {
      this.rightClickEvent = event;
      RightMenuController.show();
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.current.content,
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
      injectCSS: true,
      enableInputRules: true,
      enablePasteRules: false,
      parseOptions: {
        preserveWhitespace: "full",
      },
    });

    document.addEventListener("click", () => {
      this.rightClickEvent = null;
    });
  },
  watch: {
    changed() {
      console.log("something changed, update editor");
      this.editor.setEditable(this.editable);
      this.editor.commands.setContent(this.current.content, true);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="postcss">
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/10 shadow-2xl;
}

#tabs-container {
  @apply tabs mt-4 flex justify-center rounded-t-xl bg-yellow-400/10;
}

#editor-content-container {
  @apply mt-1 flex w-full justify-center overflow-auto border-0 p-4;
}
.ProseMirror {
  @apply mb-24 px-2 pb-56 pt-1;
}

div.ProseMirror[contenteditable="true"] {
  @apply ring-2;
}
</style>
