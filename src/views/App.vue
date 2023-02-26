<template>
  <div class="fixed flex h-screen w-screen flex-row">
    <!-- 左侧栏 -->
    <aside
      class="left-0 hidden h-screen w-56 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col"
    >
      <div class="w-full">
        <div class="draggable h-12" v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }"></div>
      </div>
      <SideMenu></SideMenu>
    </aside>

    <!-- 固定在左下角的图书logo -->
    <div
      v-if="current.getBook().hasLogo()"
      class="fixed bottom-0 h-20 w-56 border-r-2 border-t border-gray-300 opacity-90 dark:border-cyan-900/10 dark:brightness-50"
    >
      <img :src="current.getBook().logoUrl()" alt="" />
    </div>

    <div class="flex flex-grow flex-col">
      <!-- 顶栏 -->
      <div
        class="draggable z-50 flex h-12 w-full justify-between border-b border-gray-300 bg-base-200 shadow dark:border-cyan-900/10"
      >
        <div class="ml-20 flex w-full items-center lg:ml-2">
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="flex w-full flex-row items-center justify-end pr-4">
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

      <!-- 内容区域与右侧导航 -->
      <div class="mt-12 flex flex-row overflow-scroll pb-24">
        <main class="flex w-full justify-center overflow-visible px-4">
          <!-- 文章内容 -->
          <Content v-if="!editorMode"></Content>
          <!-- 编辑器 -->
          <Editor v-if="editorMode"></Editor>
        </main>

        <!-- 文章的右侧栏TOC -->
        <aside v-if="showToc" class="hidden min-h-screen w-72 justify-end xl:flex xl:flex-row">
          <div class="fixed bottom-16 top-16 right-0 flex h-screen flex-row justify-end">
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
