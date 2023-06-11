<template>
  <!-- 在root层配置底色 -->
  <!-- 如果不配置底色，daisyui会自动配置为bg-primary -->
  <!-- 因为electron配置了全透明窗口，这里最好配置一个底色 -->
  <!-- 另外注意：如果开了dev tool，是看不出透明效果的 -->
  <div id="root" :data-theme="theme" class="absolute flex w-full flex-row bg-base">
    <!-- header脱离文档流，固定定位 -->
    <Header
      class="fixed draggable top-0 z-50 h-10 w-full bg-base-200/90 backdrop-blur-sm border-b border-neutral/30 shadow-sm">
    </Header>

    <!-- 左侧导航侧栏 -->
    <Aside v-if="isAsideVisible" class="z-50 hidden flex-col h-screen w-40 overflow-scroll overscroll-none scroll-smooth 
      border-r border-neutral/30 bg-primary/10 backdrop-filter backdrop-blur-3xl shadow-sm md:flex lg:flex-col">
    </Aside>

    <!-- 右侧主内容，所有的滚动都基于main，必须有固定高度 -->
    <main
      class="flex h-screen flex-grow relative flex-col justify-between overflow-scroll overscroll-none"
      :class="{ 
        'bg-gradient-to-b from-info/30 to-base-200': !isShop, 
        'bg-gradient-to-b from-secondary/30 to-secondary/10': isShop
        }"
      >
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>

      <Footer v-if="!route.name?.toString().startsWith('setting')"
        class="fixed w-full pr-44 border-neutral/30 border-t bottom-0 z-40 h-6 flex items-center px-2 shadow-2xl backdrop-blur backdrop-filter"
        :class="{
          'bg-gradient-to-r from-base-200/30 to-base-200/40': !isShop,
          'bg-gradient-to-r from-primary/30 to-primary/10': isShop
        }">
      </Footer>
    </main>

    <!-- 弹层 -->
    <Themes></Themes>
    <FormSearch></FormSearch>
    <!-- <RightMenuModal></RightMenuModal> -->
    <FormAdd></FormAdd>
    <FormRename></FormRename>
    <Terminal></Terminal>
    <SettingModal></SettingModal>
    <!-- <ErrorModal></ErrorModal> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import FormSearch from "../modals/ModalSearch.vue";
import Themes from "../modals/Themes.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import Terminal from "../modals/Terminal.vue";
import Aside from "./Aside.vue";
import ThemesConfig from "../entities/Themes";
import { useRoute } from "vue-router";
import Preload from '../api/Preload'
import componentLogger from "../log/componentLogger";
import SettingModal from "../modals/SettingModal.vue";
import { useOtherStore } from '../stores/OtherStore';
import { useNodeStore } from "../stores/NodeStore";

const route = useRoute();
const otherStore = useOtherStore();
const nodeStore = useNodeStore()
const tree = computed(() => nodeStore.tree)
const isShop = computed(() => route.params.tree === 'shop');
const isAsideVisible = computed(() => {
  componentLogger.info('计算是否显示侧栏',tree.value.title)
  let result = true
  if (route.name?.toString().startsWith('setting')) {
    componentLogger.info('当前是设置页面，不显示侧栏')
    result = false
  } else if (tree.value.title == '商店' && route.params.id == '0') {
    componentLogger.info('当前是商城首页，不显示侧栏')
    result = false
  }

  return result
})

// 初始化主题
const themes = ThemesConfig;
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeQuery.matches);
const themeLight = ref(themes[0]);
const themeDark = computed(() => themeLight.value + "-dark");
const theme = computed(() => (isDarkMode.value ? themeDark.value : themeLight.value));

// 主动设置主题
window.addEventListener("set-theme", (e) => {
  themeLight.value = Object.getOwnPropertyDescriptor(e, "detail")!.value;
  componentLogger.info("设置主题为", theme.value);
});

// 颜色模式变化监听
darkModeQuery.addListener((e) => {
  if (e.matches) {
    componentLogger.info("主题变为暗黑模式");
    isDarkMode.value = true;
  } else {
    componentLogger.info("主题变化明亮模式");
    isDarkMode.value = false;
  }
});

// Preload.listen("update-downloaded", (e) => {
//   componentLogger.info("监测到事件：update-downloaded");
// });

Preload.listen("update-available", (e: any, args: { version: any; }[]) => {
  let version = args[0].version;
  componentLogger.info("监测到事件：update-avaliable", version);

  otherStore.setLatestVersion(version);
});

Preload.listen("checking-for-update", (e: any) => {
  componentLogger.info("监测到事件：checking-for-update");
});

// Preload.listen("update-not-available", (e) => {
//   componentLogger.info("监测到事件：update-not-available");
// });

// Preload.listen("download-progress", (_, args) => {
//   let percent = args[0].percent;
//   componentLogger.info("监测到事件：download-progress",percent);
// });

</script>

<style scoped>
.fade-enter-active {
  transition: all 0s ease-out;
}

.fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translateY(0px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(0px);
  opacity: 0;
}
</style>
