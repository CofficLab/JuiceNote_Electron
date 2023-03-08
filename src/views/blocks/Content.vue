<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll">
    <!-- 工具栏 -->
    <div id="toolbar-container" v-if="editor && editable">
      <Toolbar :editor="editor" :current="current"></Toolbar>
    </div>

    <!-- TAB -->
    <div id="tabs-container" v-if="current.getParent().isTab">
      <Link v-for="sibling in current.getSiblings()" :id="sibling.id" class="tab-lifted tab" :current="current">{{
        sibling.title
      }}</Link>
    </div>

    <!-- 编辑框 -->
    <div id="editor-content-container" @click="destroyRightMenu" @contextmenu.prevent="showRightMenu">
      <editor-content :editor="editor" class="prose w-full xl:prose-lg" />
    </div>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" :event="rightClickEvent">
      <li><Edit :bookNode="current"></Edit></li>
      <li><Rename :node="current"></Rename></li>
      <li><Add :bookNode="current"></Add></li>
      <li><Copy :bookNode="current"></Copy></li>
    </RightMenu>
  </div>
</template>

<script>
import { Editor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";
import Extensions from "../../entities/Extensions";
import Link from "../components/Link.vue";
import RightMenu from "../components/RightMenu.vue";
import Toolbar from "./Toolbar.vue";
import Add from "../operators/Add.vue";
import Copy from "../operators/Copy.vue";
import Edit from "../operators/Edit.vue";
import Rename from "../operators/Rename.vue";
import RightMenuController from "../../controllers/RightMenuController";
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";

export default {
  props: {
    current: {
      type: Node,
    },
  },
  components: {
    Add,
    Copy,
    EditorContent,
    Edit,
    BubbleMenu,
    FloatingMenu,
    Toolbar,
    Link,
    Rename,
    RightMenu,
  },
  data() {
    return {
      editor: null,
      currentTab: 0,
      rightClickEvent: null,
    };
  },
  computed: {
    editable: () => NodeController.getEditable(),
    shouldShowRightMenu: function () {
      return RightMenuController.shouldShow && this.rightClickEvent;
    },
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
    // console.log("content block mounted, init the editor");
    this.editor = new Editor({
      content: this.current.content,
      extensions: Extensions,
      autofocus: true,
      editable: this.editable,
    });

    document.addEventListener("click", () => {
      // console.log("检测到click事件，隐藏我的右键菜单");
      this.rightClickEvent = null;
    });
  },
  watch: {
    current() {
      // console.log("content changed");
      this.editor.commands.setContent(this.current.content, true);
    },
    editable() {
      console.log("editable changed", this.editable);
      this.editor.setEditable(this.editable);
      this.editor.commands.setContent(this.current.content, false);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="postcss" scoped>
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-green-300/50 shadow-2xl;
}

#tabs-container {
  @apply tabs mt-4 flex justify-center rounded-t-xl bg-yellow-400/10;
}

#editor-content-container {
  @apply mt-1 flex w-full justify-center overflow-auto border-0 p-4;
}
.ProseMirror {
  @apply pb-56;
}
</style>
