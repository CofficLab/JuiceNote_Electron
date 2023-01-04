<template>
  <div>
    <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
    <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full flex justify-center" id="title-bar" v-show="!hideTitleBar">
      <!-- <Address v-if="!isProd"></Address> -->
    </div>

    <main class="flex flex-row justify-between" v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
      <!-- 左侧栏 -->
      <aside
        class="hidden w-56 lg:flex bg-gradient-to-r from-sky-200/40 to-cyan-800/10 dark:from-cyan-800/10 dark:to-cyan-800/10"
      >
        <div class="fixed" v-bind:class="{ 'top-12': !hideTitleBar, 'top-4': hideTitleBar }">
          <SideMenu v-if="!editorMode"></SideMenu>
        </div>
      </aside>

      <!-- 内容区域 -->
      <div class="flex flex-col items-center flex-grow gap-4 pt-12 pb-48 min-h-screen bg-cyan-800/10">
        <Content v-if="!editorMode" class="prose w-full"></Content>
        <Editor v-if="editorMode"></Editor>
        <CodeContainer v-if="code != ''" class="w-full max-w-2xl mx-auto"></CodeContainer>
      </div>

      <!-- 右侧栏 -->
      <aside
        class="hidden lg:flex flex-row justify-end w-56 bg-gradient-to-r from-cyan-800/10 to-sky-200/40 dark:to-cyan-800/10 dark:from-cyan-800/10"
      >
        <div
          class="flex flex-row justify-end fixed right-0 h-screen"
          v-bind:class="{ 'top-8': !hideTitleBar, 'top-0': hideTitleBar }"
        >
          <ProjectTree v-if="current.parent().project.notEmpty()"></ProjectTree>
          <Toc v-show="!editorMode" v-if="current.parent().project.isEmpty()"></Toc>
        </div>
      </aside>
    </main>

    <footer class="h-8 fixed z-10 bottom-0 w-full p-0 flex flex-row items-center justify-center shadow-2xl md:text-lg">
      <div v-if="!isProd" class="h-full flex flex-row items-center">
        <GitCommit></GitCommit>
        <Delete></Delete>
        <Edit></Edit>
        <Add></Add>
      </div>
      <Breadcrumbs></Breadcrumbs>
      <Toast></Toast>
      <div class="flex flex-row bg-sky-100/90 dark:bg-gray-500/20 items-center h-full">
        <Prev></Prev>
        <Home></Home>
        <Next></Next>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "./Toc.vue";
import store from "../models/store";
import Breadcrumbs from "./Breadcrumbs.vue";
import Prev from "./Prev.vue";
import Next from "./Next.vue";
import Delete from "./Delete.vue";
import Add from "./Add.vue";
import Home from "./Home.vue";
import Address from "./Address.vue";
import Edit from "./Edit.vue";
import GitCommit from "./GitCommit.vue";
import Alert from "./Alert.vue";
import Toast from "./Toast.vue";
import Content from "./Content.vue";
import Editor from "./Editor.vue";
import SideMenu from "./SideMenu.vue";
import Others from "./Others.vue";
import ProjectTree from "./ProjectTree.vue";
import CodeContainer from "./CodeContainer.vue";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    Prev,
    Next,
    Delete,
    Add,
    Home,
    Address,
    Edit,
    GitCommit,
    Alert,
    Toast,
    Content,
    Editor,
    SideMenu,
    Others,
    ProjectTree,
    CodeContainer,
  },
  computed: {
    code: function () {
      return store.code;
    },
    current: function () {
      return store.current;
    },
    isProd: function (): boolean {
      return store.isProd;
    },
    hideTitleBar: function (): boolean {
      return store.full_screen;
    },
    editorMode: function () {
      return store.edit_mode;
    },
  },
  methods: {},
  beforeCreate: function () {
    // console.log("before app created,current route path is", this.$route.path);
    // console.log("before app created,current location is", location.href);
  },
  mounted: function () {
    // console.log("app mounted,current route path is", this.$route.path);
    // console.log("app mounted,protocol is", window.location.protocol);
  },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-none mx-auto prose z-10;
  ul {
    @apply list-none pl-1 fixed z-10;

    a {
      @apply no-underline z-0;
    }
  }
}
</style>
