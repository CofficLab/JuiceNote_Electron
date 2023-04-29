<template>
  <!-- 在root层配置底色 -->
  <!-- 如果不配置底色，daisyui会自动配置为bg-primary -->
  <!-- 因为electron配置了全透明窗口，这里最好配置一个底色 -->
  <div id="root" :data-theme="theme" class="absolute flex w-full flex-row bg-primary bg-white/90">
    <!-- header脱离文档流，固定定位 -->
    <Header class="fixed top-0 z-40 h-10 w-full bg-base-300"></Header>

    <!-- 左侧导航侧栏 -->
    <Aside v-if="isLesson" class="z-50 bg-base-200/90"></Aside>

    <!-- 右侧主内容，所有的滚动都基于main，必须有固定高度 -->
    <main class="flex h-screen flex-grow flex-col justify-between overflow-scroll overscroll-none bg-base-100">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>

      <Footer class="sticky bottom-0 z-50 h-10 bg-primary/10 shadow-2xl backdrop-blur-lg backdrop-filter"></Footer>
    </main>

    <!-- 弹层 -->
    <Themes></Themes>
    <FormSearch></FormSearch>
    <RightMenuModal></RightMenuModal>
    <FormAdd></FormAdd>
    <FormRename></FormRename>
    <Terminal></Terminal>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Preload from "../entities/Preload";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import FormSearch from "../modals/ModalSearch.vue";
import Themes from "../modals/Themes.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import Terminal from "../modals/Terminal.vue";
import Aside from "./Aside.vue";
import RouteBox from "../entities/RouteBox";
import { useRoute } from "vue-router";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));

// 初始化主题
const themes = Preload.getThemes();
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeQuery.matches);
const themeLight = ref(themes[0]);
const themeDark = computed(() => themeLight.value + "-dark");
const theme = computed(() => (isDarkMode.value ? themeDark.value : themeLight.value));

// 主动设置主题
window.addEventListener("set-theme", (e) => {
  themeLight.value = e.detail;
  console.log("设置主题为", theme.value);
});

// 颜色模式变化监听
darkModeQuery.addListener((e) => {
  if (e.matches) {
    console.log("主题变为暗黑模式");
    isDarkMode.value = true;
  } else {
    console.log("主题变化明亮模式");
    isDarkMode.value = false;
  }
});
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
