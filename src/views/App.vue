<template>
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <aside class="hidden w-56 border-r-2 border-gray-300 bg-base-200 shadow-xl lg:flex xl:flex-col">
      <div v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }" class="draggable w-56"></div>
      <div class="fixed w-56" v-bind:class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <SideMenu class="w-full"></SideMenu>
      </div>
    </aside>

    <div class="flex flex-grow flex-col bg-base-200">
      <!-- 顶栏 -->
      <div class="draggable fixed z-50 flex h-12 w-full justify-between border-b border-gray-300 bg-base-200 shadow">
        <div class="ml-20 flex w-full items-center lg:ml-2">
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="flex w-full flex-row items-center justify-end pr-4 lg:mr-56">
          <BtnSave v-if="editorMode"></BtnSave>
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
      <main class="mt-16 flex w-full justify-center px-4">
        <!-- 文章内容 -->
        <div
          v-show="!editorMode"
          class="ml-8 flex min-h-screen w-full flex-grow flex-col items-center gap-4 pt-12 pb-48"
        >
          <Content></Content>
        </div>

        <!-- 编辑器 -->
        <Edit v-show="editorMode"></Edit>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "../components/TocContent.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Address from "../components/Address.vue";
import Edit from "../components/Editor.vue";
import Alert from "../components/Alert.vue";
import Toast from "../components/Toast.vue";
import Content from "../components/Content.vue";
import SideMenu from "../components/SideMenu.vue";
import Others from "../components/Others.vue";
import ProjectTree from "../components/ProjectTree.vue";
import CodeContainer from "../components/CodeContainer.vue";
import CodeController from "../controllers/CodeController";
import RouteController from "../controllers/RouteController";
import FullScreenController from "../controllers/FullScreenController";
import Languages from "../components/Languages.vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import BtnMore from "../components/BtnMore.vue";
import BtnSave from "../components/BtnSave.vue";
import BtnEdit from "../components/BtnEdit.vue";
import BtnAdd from "../components/BtnAdd.vue";
import BtnHome from "../components/BtnHome.vue";
import BtnDelete from "../components/BtnDelete.vue";
import BtnPrev from "../components/BtnPrev.vue";
import BtnNext from "../components/BtnNext.vue";
import BtnCopy from "../components/BtnCopy.vue";
import BtnGitCommit from "../components/BtnGitCommit.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";

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
    Edit,
    GitCommit: BtnGitCommit,
    Alert,
    Toast,
    Content,
    SideMenu,
    Others,
    ProjectTree,
    CodeContainer,
    OfficialLink: BtnOfficialLink,
    Languages,
    BtnSave,
  },
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    code: () => CodeController.code,
    hideTitleBar: () => FullScreenController.full,
    isProd: (): boolean => RouteController.isProd,
    current: function () {
      return RouteController.getCurrentPage();
    },
    editorMode: () => RouteController.isEditMode(),
  },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply prose z-10 mx-auto rounded-none;
  ul {
    @apply fixed z-10 list-none pl-1;

    a {
      @apply z-0 no-underline;
    }
  }
}
.draggable {
  -webkit-app-region: drag;
}

.prose {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply -mt-40 pt-40;
  }
}

.h1 {
  @apply text-3xl;
}
</style>
