<template>
  <header>
    <div class="z-40 flex h-full justify-between" :class="{ 'mr-40': isWindows }">
      <div class="draggable flex-grow"></div>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="btn-ghost btn-sm flex items-center rounded px-2" v-if="isLesson"></Terminal>
        <Prev class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isLesson"></Prev>
        <Home class="btn-ghost btn-sm flex items-center rounded px-2 text-accent"></Home>
        <Shop class="btn-ghost btn-sm flex items-center rounded px-2 text-accent"></Shop>
        <Next class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isLesson"></Next>
        <More class="btn-ghost btn-sm flex items-center rounded px-2"></More>
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
import Shop from "../operators/Shop.vue";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();
</script>

<style lang="postcss" scoped>
header {
  @apply fixed top-0 z-40 h-10 w-full border-b border-base-300 bg-base-100  bg-opacity-60 pl-40 shadow backdrop-blur-sm backdrop-filter;
}
</style>
