<template>
  <div :data-theme="theme" class="bg-white">
    <Toast></Toast>
    <Header></Header>

    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <Footer></Footer>

    <!-- 弹层 -->
    <Themes></Themes>
    <FormSearch></FormSearch>
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
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
