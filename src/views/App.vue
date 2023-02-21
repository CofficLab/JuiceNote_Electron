<template>
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <aside class="hidden shadow-xl lg:flex lg:flex-col bg-base-200 border-r-2 border-gray-300 w-56">
      <div v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }" class="draggable w-56"></div>
      <div class="fixed w-56" v-bind:class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <SideMenu v-if="!editorMode" class="w-full"></SideMenu>
      </div>
    </aside>

    <div class="flex flex-col flex-grow bg-cyan-800/10">
      <!-- 顶栏 -->
      <div class="h-12 bg-base-200 border-b border-gray-300 shadow fixed z-50 w-full flex justify-between draggable">
        <div class="w-full items-center flex pl-8">
          <!-- <Address v-if="!isProd"></Address> -->
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="flex justify-end w-full mr-56 pr-4 flex-row items-center">
          <OfficialLink></OfficialLink>
          <Toast></Toast>
          <GitCommit v-if="!isProd"></GitCommit>
          <Delete v-if="!isProd"></Delete>
          <Edit v-if="!isProd"></Edit>
          <Add v-if="!isProd"></Add>
          <Copy v-if="!isProd"></Copy>
          <Prev></Prev>
          <Home></Home>
          <Next></Next>
        </div>
      </div>

      <!-- 内容区域与右侧导航 -->
      <main class="flex flex-row justify-between pt-12">
        <!-- 文章内容 -->
        <div class="flex flex-col items-center flex-grow gap-4 pt-12 pb-48 min-h-screen">
          <Content v-if="!editorMode" class="prose w-full"></Content>
          <Editor v-if="editorMode"></Editor>
          <CodeContainer v-if="code != ''" class="w-full max-w-2xl mx-auto"></CodeContainer>
        </div>

        <!-- 右侧栏 -->
        <aside class="hidden lg:flex flex-row justify-end w-72">
          <div class="flex flex-row justify-end fixed right-0 h-screen">
            <!-- <ProjectTree v-if="current.parent().project.notEmpty()"></ProjectTree> -->
            <Toc v-show="!editorMode"></Toc>
          </div>
        </aside>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Copy from "../components/Copy.vue";
import Toc from "../components/Toc.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Prev from "../components/Prev.vue";
import Next from "../components/Next.vue";
import Delete from "../components/Delete.vue";
import Add from "../components/Add.vue";
import Home from "../components/Home.vue";
import Address from "../components/Address.vue";
import Edit from "../components/Edit.vue";
import GitCommit from "../components/GitCommit.vue";
import Alert from "../components/Alert.vue";
import Toast from "../components/Toast.vue";
import Content from "../components/Content.vue";
import Editor from "../components/Editor.vue";
import SideMenu from "../components/SideMenu.vue";
import Others from "../components/Others.vue";
import ProjectTree from "../components/ProjectTree.vue";
import CodeContainer from "../components/CodeContainer.vue";
import CodeController from "../controllers/CodeController";
import RouteController from "../controllers/RouteController";
import FullScreenController from "../controllers/FullScreenController";
import EditModeController from "../controllers/EditModeController";
import OfficialLink from "../components/OfficialLink.vue";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    Copy,
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
    OfficialLink,
  },
  computed: {
    code: () => CodeController.code,
    hideTitleBar: () => FullScreenController.full,
    isProd: (): boolean => RouteController.isProd,
    current: RouteController.getCurrentPage,
    editorMode: () => EditModeController.edit_mode,
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
