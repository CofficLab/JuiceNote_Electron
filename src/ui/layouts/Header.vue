<template>
  <header>
    <Toast></Toast>

    <div class="flex h-full justify-between" :class="{ 'mr-40': isWindows }">
      <div class="draggable flex-grow flex justify-center">
        {{ address }}
      </div>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="btn-ghost btn-sm flex items-center rounded px-2" v-if="isLesson"></Terminal>
        <!-- <Prev class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isLesson"></Prev> -->
        <!-- <Next class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isLesson"></Next> -->
        <Home class="btn-ghost btn-sm flex items-center rounded px-2"></Home>
        <Tree class="btn-ghost btn-sm flex items-center rounded px-2"></Tree>
        <Shop class="btn-ghost btn-sm flex items-center rounded px-2"></Shop>
        <More class="btn-ghost btn-sm flex items-center rounded px-2"></More>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Home from "../operators/Home.vue";
import Tree from '../operators/Tree.vue'
import More from "../operators/More.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Terminal from "../operators/Terminal.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Preload from "../api/Preload";
import RouteBox from "../entities/RouteBox";
import Shop from "../operators/Shop.vue";
import Toast from "./Toast.vue";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();

const address = computed(() => {
  return location.href
})
</script>

<style lang="postcss" scoped>
header {
  @apply border-b border-base-300 shadow backdrop-blur-sm backdrop-filter;
}
</style>
