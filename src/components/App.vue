<template>
  <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full flex justify-center" id="title-bar" v-show="!hideTitleBar">
    <Address v-if="!isProd"></Address>
  </div>

  <main
    class="bg-green-200/20 flex flex-row z-10 min-h-screen overflow-scroll"
    v-bind:class="hideTitleBar ? 'top-0' : 'top-8'"
  >
    <!-- 左侧栏 -->
    <aside class="hidden lg:block w-56 min-h-screen bg-gradient-to-r from-sky-200/50 to-base-200">
      <div class="py-4 overflow-scroll">
        <SideMenu v-if="!editorMode"></SideMenu>
      </div>
    </aside>

    <!-- 内容区域 -->
    <div class="flex-grow">
      <div
        class="fixed left-0 lg:left-56 right-0 bottom-8 bg-base-200 pt-4"
        v-bind:class="hideTitleBar ? 'top-0' : 'top-8'"
      >
        <div class="h-full overflow-scroll scroll-m-48 scroll-p-52 flex flex-row">
          <Content v-if="!editorMode"></Content>
          <Editor v-if="editorMode"></Editor>
        </div>
      </div>
    </div>

    <!-- 右侧栏 -->
    <aside class="hidden lg:block w-56 min-h-screen">
      <Toc v-show="!editorMode"></Toc>
    </aside>
  </main>

  <footer class="h-8 fixed bottom-0 w-full p-0 flex border-t border-slate-500">
    <Toast></Toast>
    <div class="flex" v-if="!isProd"><GitCommit></GitCommit></div>
    <div class="flex" v-if="!isProd"><Delete></Delete></div>
    <div class="flex" v-if="!isProd"><Edit></Edit></div>
    <div class="flex" v-if="!isProd"><Add></Add></div>
    <div class="flex"><Home></Home></div>
    <div class="flex flex-grow"><Breadcrumbs></Breadcrumbs></div>
    <div class="flex"><Prev></Prev></div>
    <div class="flex"><Next></Next></div>
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
