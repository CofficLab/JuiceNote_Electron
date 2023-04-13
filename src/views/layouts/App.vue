<template>
  <div>
    <header v-if="headerVisible" class="fixed top-0 z-40 h-12 w-full border-b border-gray-300 bg-base-200 pl-40 shadow dark:border-cyan-900/10">
      <TopBar></TopBar>
    </header>

    <aside v-if="asideVisible" class="fixed left-0 z-50 hidden h-screen w-40 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col">
      <SideMenu></SideMenu>
    </aside>

    <main :class="{'pl-40':asideVisible,'top-12':headerVisible}" class="fixed h-screen w-full overflow-scroll overscroll-none bg-cyan-800/10 dark:bg-slate-900/10">
      <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
    </main>

    <DebugBar v-if="!isProd"></DebugBar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "../blocks/SideMenu.vue";
import TopBar from "../blocks/TopBar.vue";
import DebugBar from "../blocks/DebugBar.vue";

const isProd = window.location.protocol === "file:";
const asideVisible = computed(()=>['lessons.show','lessons.index'].includes(useRoute().name))
const headerVisible = computed(()=>['lessons.show','lessons.index','home.show','home.edit'].includes(useRoute().name))
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
