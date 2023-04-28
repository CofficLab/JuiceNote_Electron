<template>
  <header>
    <div class="flex justify-between h-full" :class="{ 'mr-40': isWindows }">
      <div class="flex-grow draggable"></div>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="flex items-center px-2 rounded btn-ghost btn-sm"></Terminal>
        <Prev class="flex items-center px-2 rounded btn-ghost btn-sm" :showText="false" v-if="isLesson"></Prev>
        <Home class="flex items-center px-2 rounded btn-ghost btn-sm text-accent"></Home>
        <Next class="flex items-center px-2 rounded btn-ghost btn-sm" :showText="false" v-if="isLesson"></Next>
        <More class="flex items-center px-2 rounded btn-ghost btn-sm"></More>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Home from "../operators/Home.vue";
import More from "../operators/More.vue";
import Next from "../operators/Next.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Prev from "../operators/Prev.vue";
import Terminal from "../operators/Terminal.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Preload from "../entities/Preload";
import RouteBox from "../entities/RouteBox";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();
</script>

<style lang="postcss" scoped>
header {
  @apply fixed top-0 z-40 h-10 w-full border-b border-base-300 bg-base-100 bg-opacity-60  backdrop-filter backdrop-blur-sm pl-40 shadow;
}
</style>
