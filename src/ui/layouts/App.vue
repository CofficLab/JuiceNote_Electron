<template>
  <div :data-theme="theme">
    <Toast v-if="headerVisible"></Toast>

    <Header v-if="headerVisible"></Header>

    <Aside v-if="asideVisible"></Aside>

    <Main></Main>

    <!-- 弹层 -->
    <RightMenuModal></RightMenuModal>
    <FormSearch></FormSearch>
    <FormAdd></FormAdd>
    <FormRename></FormRename>

    <!-- 全局的组件 -->
    <Terminal v-if="terminalVisible"></Terminal>

    <BottomBar></BottomBar>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Aside from "../blocks/Aside.vue";
import Header from "../blocks/Header.vue";
import Main from "../blocks/Main.vue";
import BottomBar from "../blocks/BottomBar.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import Toast from "../blocks/Toast.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import FormSearch from "../modals/FormSearch.vue";
import Node from "../entities/Node";
import Terminal from "../components/Terminal.vue";

// 初始化主题
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeQuery.matches);
const themeLight = ref("cloud");
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

const route = useRoute();
const asideVisible = computed(() => ["lessons.show", "lessons.edit"].includes(route.name));
const headerVisible = computed(() => {
  if (route.name == "lessons.edit") {
    return Node.find(route.params.id).isChapter;
  }

  return ["lessons.show", "home.show", "home.edit"].includes(route.name);
});
const terminalVisible = ref(false);

window.addEventListener("toggle-terminal", () => (terminalVisible.value = !terminalVisible.value));
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
