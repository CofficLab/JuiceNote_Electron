<template>
  <div class="flex h-screen w-screen flex-row">
    <!-- 左侧栏 -->
    <aside
      class="hidden h-screen w-56 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col"
    >
      <SideMenu></SideMenu>
    </aside>

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
          <BtnOfficialLink></BtnOfficialLink>
          <BtnTerminal></BtnTerminal>
          <Toast></Toast>
          <BtnPrev></BtnPrev>
          <BtnHome></BtnHome>
          <BtnNext></BtnNext>
          <BtnMore></BtnMore>
        </div>
      </div>

      <!-- 内容区域与右侧导航 -->
      <div class="flex flex-row overflow-scroll">
        <main class="flex w-full justify-center">
          <!-- 文章内容 -->
          <Content></Content>
        </main>

        <!-- 新建图书节点的弹层 -->
        <Add></Add>
        <!-- 重命名的弹层 -->
        <Rename></Rename>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BtnTerminal from "./components/BtnTerminal.vue";
import BtnMore from "./components/BtnMore.vue";
import BtnEdit from "./components/BtnEdit.vue";
import BtnAdd from "./components/BtnAdd.vue";
import BtnHome from "./components/BtnHome.vue";
import BtnDelete from "./components/BtnDelete.vue";
import BtnPrev from "./components/BtnPrev.vue";
import BtnNext from "./components/BtnNext.vue";
import BtnCopy from "./components/BtnCopy.vue";
import BtnGitCommit from "./components/BtnGitCommit.vue";
import BtnOfficialLink from "./components/BtnOfficialLink.vue";
import Toc from "./components/TocContent.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import Address from "./components/Address.vue";
import Alert from "./components/Alert.vue";
import Add from "./modals/Add.vue";
import Toast from "./components/Toast.vue";
import Content from "./components/Content.vue";
import SideMenu from "./components/SideMenu.vue";
import Others from "./components/Others.vue";
import ProjectTree from "./components/ProjectTree.vue";
import RouteController from "../controllers/RouteController";
import FullScreenController from "../controllers/FullScreenController";
import Languages from "./components/Languages.vue";
import path from "path";
import Rename from "./modals/Rename.vue";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    BtnMore,
    BtnTerminal,
    BtnEdit,
    BtnAdd,
    BtnCopy,
    BtnPrev,
    BtnNext,
    BtnDelete,
    Add,
    BtnHome,
    Address,
    BtnGitCommit,
    Alert,
    Toast,
    Content,
    SideMenu,
    Others,
    ProjectTree,
    BtnOfficialLink,
    Languages,
    Rename,
  },
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().getSourceCode(),
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
