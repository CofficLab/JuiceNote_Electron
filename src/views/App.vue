<template>
  <div class="flex flex-row">
    <!-- 左侧栏 -->
    <aside class="hidden shadow-xl lg:flex xl:flex-col bg-base-200 border-r-2 border-gray-300 w-56">
      <div v-bind:class="{ 'h-12': !hideTitleBar, 'h-0': hideTitleBar }" class="draggable w-56"></div>
      <div class="fixed w-56" v-bind:class="{ 'top-12': !hideTitleBar, 'top-0': hideTitleBar }">
        <SideMenu class="w-full"></SideMenu>
      </div>
    </aside>

    <div class="flex flex-col flex-grow bg-cyan-800/10">
      <!-- 顶栏 -->
      <div class="h-12 bg-base-200 border-b border-gray-300 shadow fixed z-50 w-full flex justify-between draggable">
        <div class="w-full items-center flex ml-20 lg:ml-2">
          <!-- <Address v-if="!isProd"></Address> -->
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="flex justify-end w-full lg:mr-56 pr-4 flex-row items-center">
          <!-- <BtnSave v-if="editorMode"></BtnSave> -->
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
      <main class="flex px-4 justify-center w-full mt-16">
        <Show v-if="!editorMode"></Show>
        <Edit v-if="editorMode"></Edit>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Copy from "../components/BtnCopy.vue";
import Toc from "../components/Toc.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Prev from "../components/BtnPrev.vue";
import Next from "../components/BtnNext.vue";
import Delete from "../components/BtnDelete.vue";
import Add from "../components/BtnAdd.vue";
import Home from "../components/BtnHome.vue";
import Address from "../components/Address.vue";
import Edit from "../views/Edit.vue";
import GitCommit from "../components/BtnGitCommit.vue";
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
import OfficialLink from "../components/BtnOfficialLink.vue";
import Languages from "../components/Languages.vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import BtnMore from "../components/BtnMore.vue";
import BtnSave from "../components/BtnSave.vue";
import BtnEdit from "../components/BtnEdit.vue";
import Show from "./Show.vue";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    BtnMore,
    BtnTerminal,
    BtnEdit,
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
    SideMenu,
    Others,
    ProjectTree,
    CodeContainer,
    OfficialLink,
    Languages,
    BtnSave,
    Show,
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
    current: RouteController.getCurrentPage,
    editorMode: () => RouteController.isEditMode(),
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
