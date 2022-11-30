<template>
  <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full flex justify-center" id="title-bar" v-show="!hideTitleBar">
    <Address v-if="!isProd"></Address>
  </div>

  <main class="flex flex-row z-10" v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
    <!-- 左侧栏 -->
    <aside
      class="hidden md:block w-56 min-h-screen bg-gradient-to-r from-sky-200/40 to-cyan-800/10 dark:from-cyan-800/10 dark:to-cyan-800/10 relative"
    >
      <div class="fixed" v-bind:class="{ 'top-12': !hideTitleBar, 'top-4': hideTitleBar }">
        <SideMenu v-if="!editorMode"></SideMenu>
      </div>
    </aside>

    <!-- 内容区域 -->
    <div class="flex-grow flex flex-col gap-4 pt-12 bg-cyan-800/10 pb-48 mr-0 lg:mr-56 min-h-screen">
      <Content v-if="!editorMode"></Content>
      <Editor v-if="editorMode"></Editor>
    </div>

    <!-- 右侧栏 -->
    <aside
      v-bind:class="{ 'pt-12': !hideTitleBar, 'pt-4': hideTitleBar }"
      class="z-10 hidden lg:flex lg:flex-col w-56 pr-0 h-full bg-gradient-to-r from-cyan-800/10 to-sky-200/40 dark:to-cyan-800/10 dark:from-cyan-800/10 overflow-scroll fixed top-0 right-0 justify-start"
    >
      <div class="flex flex-row justify-end">
        <Toc v-show="!editorMode"></Toc>
      </div>
    </aside>
  </main>

  <footer class="h-8 fixed z-10 bottom-0 w-full p-0 flex justify-center shadow-2xl">
    <div class="flex" v-if="!isProd"><GitCommit></GitCommit></div>
    <div class="flex" v-if="!isProd"><Delete></Delete></div>
    <div class="flex" v-if="!isProd"><Edit></Edit></div>
    <div class="flex" v-if="!isProd"><Add></Add></div>
    <Breadcrumbs
      class="bg-gradient-to-r from-sky-200/40 via-sky-200/90 to-sky-200/40 dark:from-sky-800/80 dark:via-sky-900 dark:to-sky-800/80"
    ></Breadcrumbs>
    <Toast></Toast>
    <div class="bg-sky-100/90 dark:bg-gray-500/20 flex flex-row">
      <div class="flex"><Prev></Prev></div>
      <div class="flex"><Home></Home></div>
      <div class="flex"><Next></Next></div>
    </div>
  </footer>
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
  },
  computed: {
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
