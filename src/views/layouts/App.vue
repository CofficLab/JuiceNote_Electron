<template>
  <div>
    <header class="fixed top-0 z-40 h-12 w-full border-b border-gray-300 bg-base-200 pl-40 shadow dark:border-cyan-900/10">
      <TopBar></TopBar>
    </header>

    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <DebugBar v-if="!isProd"></DebugBar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import TopBar from "../blocks/TopBar.vue";
import DebugBar from "../blocks/DebugBar.vue";

const isProd = window.location.protocol === "file:";
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
