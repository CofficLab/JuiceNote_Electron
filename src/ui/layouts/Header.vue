<template>
  <header>
    <Toast></Toast>

    <div class="flex h-full justify-between" :class="{ 'mr-40': isWindows }">
      <div class="draggable flex-grow"></div>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="btn-ghost btn-sm flex items-center rounded px-2 text-accent" v-if="isLesson"></Terminal>
        <!-- <Prev class="btn-ghost btn-sm flex items-center rounded px-2 text-accent" :showText="false" v-if="isLesson"></Prev> -->
        <!-- <Next class="btn-ghost btn-sm flex items-center rounded px-2 text-accent" :showText="false" v-if="isLesson"></Next> -->
        <Home class="btn-ghost btn-sm flex items-center rounded px-2 text-accent"></Home>
        <Shop class="btn-ghost btn-sm flex items-center rounded px-2 text-accent"></Shop>
        <More class="btn-ghost btn-sm flex items-center rounded px-2 text-accent"></More>
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
import Toast from "./Toast.vue";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();
</script>

<style lang="postcss" scoped>
header {
  @apply border-b border-base-300 bg-base-100 bg-opacity-60 shadow backdrop-blur-sm backdrop-filter;
}
</style>
