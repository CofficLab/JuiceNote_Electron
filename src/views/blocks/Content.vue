<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container" v-if="editor && editable">
      <Toolbar :editor="editor" :current="current"></Toolbar>
    </div>

    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" class="tab tab-lifted" :node="sibling">{{ sibling.title }}</Link>
    </div>

    <!-- 编辑框 -->
    <div id="editor-container" @contextmenu.prevent="showRightMenu">
      <editor-content
        v-if="!sourceCodeDisplay"
        :editor="editor"
        class="prose h-screen w-full overflow-visible xl:prose-lg"
        :class="{ 'lg:mr-56': hasToc }"
      />
    </div>

    <!-- 源码 -->
    <div class="container">
      <Monaco v-if="sourceCodeDisplay" :code="code" language="html" :readOnly="true" :showLineNumbers="true"></Monaco>
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
import Monaco from "../components/Monaco.vue";

export default {
  components: { CreateChild, Copy, EditorContent, Edit, Toolbar, Rename, Link, RightMenu, Next, Prev, Delete, Monaco },
  data() {
    return {
      editor: undefined,
      currentTab: 0,
      rightClickEvent: null,
      hasToc: false,
      sourceCodeDisplay: false,
      headings: [],
      node: null,
      code: "",
    };
  },
  computed: {
    editable: () => NodeController.getEditable(),
    shouldShowRightMenu: function () {
      return RightMenuController.shouldShow && this.rightClickEvent;
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
    checkToc() {
      this.hasToc = this.editor.getHTML().startsWith("<toc></toc>");
    },
    toggleSourceCode() {
      this.sourceCodeDisplay = !this.sourceCodeDisplay;
    },
    save() {
      console.log("保存节点", this.node.id, "的内容");
      this.node.updateContent(this.editor.getHTML());
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
      injectCSS: true,
      enableInputRules: true,
      enablePasteRules: false,
      parseOptions: {
        preserveWhitespace: "full",
      },
      onCreate: () => {
        this.node = this.current;
        this.editor.commands.setContent(this.node.content, false);
        this.checkToc();
        this.code = this.editor.getHTML();
      },
      onUpdate: (event) => {
        // console.log("editor updated,save content and check toc");
        this.save();
        this.checkToc();
        this.code = this.editor.getHTML();
      },
    });

    document.addEventListener("click", () => {
      this.rightClickEvent = null;
    });
  },
  watch: {
    current() {
      // console.log("current changed, update editor content");
      this.save();
      this.node = this.current;
      this.editor.commands.setContent(this.node.content, true);
    },
    editable() {
      this.editor.setEditable(this.editable, false);
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
#editor-container {
  @apply mt-1 flex w-full justify-center overflow-auto border-0 p-4;
}
.ProseMirror {
  @apply mb-24 px-2 pb-56 pt-1;
}
table {
  @apply rounded-none;
  td,
  th {
    @apply border border-gray-700 p-2 !important;
  }
  p {
    @apply my-0 !important;
  }
}
</style>
