<template>
  <div>
    <aside v-if="sideMenuVisible" class="fixed left-0 z-50 hidden h-screen w-40 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col">
      <SideMenu></SideMenu>
    </aside>

    <main class="fixed top-12 h-screen w-full overflow-scroll overscroll-none bg-cyan-800/10 pl-40 dark:bg-slate-900/10">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "../blocks/SideMenu.vue";

const sideMenuVisible = computed(() => useRoute().name == "lessons.show" || useRoute().name == "lessons.edit");
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
