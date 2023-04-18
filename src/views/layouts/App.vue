<template>
  <div>
    <Toast></Toast>

    <header v-if="headerVisible" class="fixed top-0 z-40 h-8 w-full border-b border-gray-300 bg-base-200 pl-40 shadow dark:border-cyan-900/10">
      <TopBar></TopBar>
    </header>

    <aside v-if="asideVisible" class="fixed left-0 z-40 hidden h-screen w-40 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col">
      <SideMenu></SideMenu>
    </aside>

    <main 
    v-on:contextmenu="showRightMenu" :class="{ 'pl-40': asideVisible }" class="fixed top-8 h-screen w-full overflow-scroll overscroll-none bg-cyan-800/10 dark:bg-slate-900/10">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <RightMenuModal :event="rightClickEvent"></RightMenuModal>

    <DebugBar></DebugBar>
    <!-- <BottomBar></BottomBar> -->
  </div>
</template>

<script setup>
import { computed,ref } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "../blocks/SideMenu.vue";
import TopBar from "../blocks/TopBar.vue";
import DebugBar from "../blocks/DebugBar.vue";
import BottomBar from "../blocks/BottomBar.vue";
import Toast from "../blocks/Toast.vue";
import {Node} from "../../models/Node.ts"
import RightMenuModal from "../modals/RightMenuModal.vue";

const route = useRoute()
const isProd = window.location.protocol === "file:";
const asideVisible = computed(() => ["lessons.show", "lessons.edit"].includes(route.name));
const headerVisible = computed(() => {
  if (route.name == 'lessons.edit') {
    return Node.find(route.params.id).isChapter
  }

  return ["lessons.show", "home.show", "home.edit"].includes(route.name)
});

let rightClickEvent = ref(null)

const showRightMenu = function (event) {
  event.preventDefault();

  rightClickEvent.value = event;
};

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
