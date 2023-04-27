<template>
  <main :class="{ 'pl-40': asideVisible, 'top-10': headerVisible }">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import RouteBox from "../entities/RouteBox";

const theme = ref("light");
const route = useRoute();
const asideVisible = computed(() => RouteBox.isAsideVisible(route));
const headerVisible = computed(() => RouteBox.isHeaderVisible(route));
const terminalVisible = ref(false);

window.addEventListener("toggle-terminal", () => (terminalVisible.value = !terminalVisible.value));
window.addEventListener("set-theme", (e) => {
  theme.value = e.detail;
});
</script>

<style scoped lang="postcss">
main {
  @apply fixed top-0 h-screen w-full overflow-scroll overscroll-none bg-base-100;
}

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
