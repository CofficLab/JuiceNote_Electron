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

    <!-- <DebugBar></DebugBar> -->
    <BottomBar></BottomBar>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Aside from "../blocks/Aside.vue";
import Header from "../blocks/Header.vue";
import DebugBar from "../blocks/DebugBar.vue";
import Main from "../blocks/Main.vue";
import BottomBar from "../blocks/BottomBar.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import Toast from "../blocks/Toast.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import FormSearch from "../modals/FormSearch.vue";
import Node from "../entities/Node";
import Terminal from "../components/Terminal.vue";

const theme = ref("light");
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
window.addEventListener("set-theme", (e) => {
  theme.value = e.detail;
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
