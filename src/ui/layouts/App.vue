<template>
  <div>
    <Toast v-if="headerVisible"></Toast>

    <header v-if="headerVisible" class="fixed top-0 z-40 h-10 w-full border-b border-gray-300 bg-base-200 pl-40 shadow dark:border-cyan-900/10">
      <TopBar></TopBar>
    </header>

    <aside v-if="asideVisible" class="fixed left-0 z-40 hidden h-screen w-40 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col">
      <SideMenu></SideMenu>
    </aside>

    <main :class="{ 'pl-40': asideVisible, 'top-10': headerVisible }" class="fixed top-0 h-screen w-full overflow-scroll overscroll-none bg-cyan-800/10 dark:bg-slate-900/10">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 弹层 -->
    <RightMenuModal></RightMenuModal>
    <FormSearch></FormSearch>
    <FormAdd></FormAdd>
    <FormRename></FormRename>

    <!-- 全局的组件 -->
    <Terminal v-if="terminalVisible"></Terminal>

    <!-- <DebugBar></DebugBar> -->
    <!-- <BottomBar></BottomBar> -->
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "../blocks/SideMenu.vue";
import TopBar from "../blocks/TopBar.vue";
import DebugBar from "../blocks/DebugBar.vue";
import BottomBar from "../blocks/BottomBar.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import Toast from "../blocks/Toast.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import FormSearch from "../modals/FormSearch.vue";
import Node from "../entities/Node";
import Terminal from "../components/Terminal.vue";

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
