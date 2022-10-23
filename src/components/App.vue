<template>
  <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full flex justify-center" id="title-bar" v-show="!hideTitleBar">
    <Address></Address>
  </div>

  <main class="bg-green-200/20 flex flex-row z-10 min-h-screen overflow-hidden">
    <!-- 左侧栏 -->
    <div class="w-56">
      <div
        class="bg-gradient-to-r from-base-300/50 to-base-200/90 fixed bottom-8 w-56 py-4"
        v-bind:class="hideTitleBar ? 'top-0' : 'top-8'"
      >
        <Toc v-show="!editorMode"></Toc>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-grow">
      <div class="fixed left-56 bottom-8 right-0 bg-base-200 pt-4" v-bind:class="hideTitleBar ? 'top-0' : 'top-8'">
        <div class="h-full overflow-scroll scroll-m-48 scroll-p-52">
          <Content v-if="!editorMode"></Content>
          <Editor v-if="editorMode"></Editor>
        </div>
      </div>
    </div>
  </main>

  <footer class="h-8 fixed bottom-0 w-full p-0 flex border-t border-slate-500">
    <Toast></Toast>
    <div class="flex"><GitCommit></GitCommit></div>
    <div class="flex"><Delete></Delete></div>
    <div class="flex"><Edit></Edit></div>
    <div class="flex"><Add></Add></div>
    <div class="flex"><Home></Home></div>
    <div class="flex"><Prev></Prev></div>
    <div class="flex flex-grow"><Breadcrumbs></Breadcrumbs></div>
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
  },
  computed: {
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
