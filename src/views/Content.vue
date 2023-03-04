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
    <div class="tabs mt-4 flex justify-center rounded-t-xl bg-yellow-400/10" v-if="current.getParent().isTab()">
      <Link v-for="sibling in siblings" :href="sibling.id" class="tab tab-lifted">{{ sibling.name }}</Link>
    </div>

    <!-- 编辑框 -->
    <div
      class="mt-1 flex w-full justify-center overflow-auto border-0 p-4 pb-24"
      @click="destroyRightMenu"
      @contextmenu.prevent="showRightMenu"
    >
      <editor-content :editor="editor" class="prose w-full xl:prose-lg" />
    </div>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" :event="rightClickEvent">
      <li><Refresh></Refresh></li>
      <li><Edit :bookNode="current"></Edit></li>
      <li><Rename :bookNode="current"></Rename></li>
      <li><Add :bookNode="current"></Add></li>
      <li><Copy :bookNode="current"></Copy></li>
    </RightMenu>
  </div>
</template>

<script>
import { Editor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";
import RouteController from "../controllers/RouteController";
import Extensions from "../entities/Extensions";
import Link from "../components/Link.vue";
import RightMenu from "../components/RightMenu.vue";
import Toolbar from "./Toolbar.vue";
import Refresh from "../operators/Refresh.vue";
import Add from "../operators/Add.vue";
import Copy from "../operators/Copy.vue";
import Edit from "../operators/Edit.vue";
import Rename from "../operators/Rename.vue";
import RightMenuController from "../controllers/RightMenuController";

export default {
  components: {
    Add,
    Copy,
    EditorContent,
    Edit,
    BubbleMenu,
    FloatingMenu,
    Toolbar,
    Link,
    Refresh,
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
    current: () => RouteController.currentPage,
    editable: () => RouteController.editable,
    siblings: () => RouteController.currentPage.siblingsWithCurrent(),
    content: () => RouteController.currentPage.getSourceCode(),
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
    // destroyRightMenu() {
    //   RightMenuController.hide();
    // },
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

    document.addEventListener("click", () => {
      // console.log("检测到click事件，隐藏我的右键菜单");
      this.rightClickEvent = null;
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
