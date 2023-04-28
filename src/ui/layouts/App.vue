<template>
  <div :data-theme="theme" class="bg-primary bg-opacity-30">
    <LessonAside v-if="isLesson"></LessonAside>
    <Toast></Toast>
    <Header></Header>

    <main class="overflow-scroll">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 弹层 -->
    <Themes></Themes>
    <FormSearch></FormSearch>
    <RightMenuModal></RightMenuModal>
    <FormAdd></FormAdd>
    <FormRename></FormRename>
    <Terminal></Terminal>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Preload from "../entities/Preload";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Toast from "./Toast.vue";
import FormSearch from "../modals/FormSearch.vue";
import Themes from "../modals/Themes.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import Terminal from "../modals/Terminal.vue";
import LessonAside from "./LessonAside.vue";
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
