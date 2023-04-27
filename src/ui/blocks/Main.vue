<template>
  <main :class="{ 'pl-40': asideVisible, 'top-10': headerVisible }" class="fixed top-0 h-screen w-full overflow-scroll overscroll-none bg-base-300">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Node from "../entities/Node";

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
