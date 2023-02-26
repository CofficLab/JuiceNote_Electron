<template>
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <aside
      class="fixed left-0 hidden h-screen w-56 border-r-2 border-gray-300 bg-base-200 shadow-xl lg:flex xl:flex-col"
    >
      <div v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }" class="draggable w-56"></div>
      <div class="fixed w-56" v-bind:class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <SideMenu class="w-full"></SideMenu>
      </div>
    </aside>

    <div class="flex flex-grow flex-col lg:ml-56">
      <!-- 顶栏 -->
      <div class="draggable fixed z-50 flex h-12 w-full justify-between border-b border-gray-300 bg-base-200 shadow">
        <div class="ml-20 flex w-full items-center lg:ml-2">
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="flex w-full flex-row items-center justify-end pr-4 lg:mr-56">
          <span class="ml-4" v-if="editorMode"></span>
          <Languages></Languages>
          <OfficialLink></OfficialLink>
          <BtnTerminal></BtnTerminal>
          <Toast></Toast>
          <GitCommit v-if="!isProd" class="hidden lg:flex"></GitCommit>
          <Delete v-if="!isProd" class="hidden lg:flex"></Delete>
          <BtnEdit v-if="!isProd" class="hidden lg:flex"></BtnEdit>
          <Add v-if="!isProd" class="hidden lg:flex"></Add>
          <Copy v-if="!isProd"></Copy>
          <Prev></Prev>
          <Home></Home>
          <Next></Next>
          <BtnMore class="lg:hidden"></BtnMore>
        </div>
      </div>

      <div class="mt-16 flex flex-row">
        <!-- 内容区域与右侧导航 -->
        <main class="flex w-full justify-center px-4">
          <!-- 文章内容 -->
          <Content v-if="!editorMode"></Content>
          <!-- 编辑器 -->
          <Editor v-if="editorMode"></Editor>
        </main>

        <!-- 文章的右侧栏TOC -->
        <aside v-if="showToc" class="hidden min-h-screen w-56 justify-end xl:flex xl:flex-row">
          <div class="fixed right-0 flex h-screen w-56 flex-row justify-end">
            <Toc></Toc>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import BtnMore from "../components/BtnMore.vue";
import BtnEdit from "../components/BtnEdit.vue";
import BtnAdd from "../components/BtnAdd.vue";
import BtnHome from "../components/BtnHome.vue";
import BtnDelete from "../components/BtnDelete.vue";
import BtnPrev from "../components/BtnPrev.vue";
import BtnNext from "../components/BtnNext.vue";
import BtnCopy from "../components/BtnCopy.vue";
import BtnGitCommit from "../components/BtnGitCommit.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Toc from "../components/TocContent.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Address from "../components/Address.vue";
import Alert from "../components/Alert.vue";
import Toast from "../components/Toast.vue";
import Content from "../components/Content.vue";
import SideMenu from "../components/SideMenu.vue";
import Others from "../components/Others.vue";
import ProjectTree from "../components/ProjectTree.vue";
import RouteController from "../controllers/RouteController";
import FullScreenController from "../controllers/FullScreenController";
import Languages from "../components/Languages.vue";
import Editor from "../components/Editor.vue";
import path from "path";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    BtnMore,
    BtnTerminal,
    BtnEdit,
    Copy: BtnCopy,
    Prev: BtnPrev,
    Next: BtnNext,
    Delete: BtnDelete,
    Add: BtnAdd,
    Home: BtnHome,
    Address,
    GitCommit: BtnGitCommit,
    Alert,
    Toast,
    Content,
    SideMenu,
    Others,
    ProjectTree,
    OfficialLink: BtnOfficialLink,
    Languages,
    Editor,
  },
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    hideTitleBar: () => FullScreenController.full,
    isProd: (): boolean => RouteController.isProd,
    current: function () {
      return RouteController.getCurrentPage();
    },
    editorMode: () => RouteController.isEditMode(),
    showToc() {
      return path.extname(this.current.path) == ".md";
    },
  },
});
</script>
