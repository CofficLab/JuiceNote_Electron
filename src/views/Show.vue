<template>
  <div class="flex flex-row">
    <!-- 文章内容 -->
    <div class="flex flex-col ml-8 items-center flex-grow gap-4 pt-12 pb-48 min-h-screen">
      <Content class="prose w-full 2xl:prose-xl 3xl:prose-xl"></Content>
    </div>

    <!-- 文章的右侧栏 -->
    <aside class="hidden xl:flex xl:flex-row justify-end w-56 min-h-screen">
      <div class="flex flex-row justify-end w-56 fixed right-0 h-screen">
        <Toc :markdownSourceCode="markdownSourceCode"></Toc>
      </div>
    </aside>
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
import Edit from "../components/BtnEdit.vue";
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
import EditModeController from "../controllers/EditModeController";
import OfficialLink from "../components/BtnOfficialLink.vue";
import Languages from "../components/Languages.vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import BtnMore from "../components/BtnMore.vue";
import BtnSave from "../components/BtnSave.vue";

export default defineComponent({
  components: {
    Toc,
    Breadcrumbs,
    BtnMore,
    BtnTerminal,
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
    editorMode: () => EditModeController.edit_mode,
  },
});
</script>
