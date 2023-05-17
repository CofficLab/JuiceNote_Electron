<template>
  <header>
    <Toast></Toast>

    <div class="flex h-full justify-between" :class="{ 'mr-40': isWindows }">
      <div class="draggable flex-grow flex justify-center"></div>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="operators" v-if="isLesson"></Terminal>
        <!-- <Prev class="operators" :showText="false" v-if="isLesson"></Prev> -->
        <!-- <Next class="operators" :showText="false" v-if="isLesson"></Next> -->
        <Home class="operators"></Home>
        <Tree class="operators"></Tree>
        <Edit :showText="false" class="operators"></Edit>
        <!-- <Shop class="operators"></Shop> -->
          <Delete :node="current" :show-text="false" class="operators"></Delete>
        <More class="operators"></More>
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
import Edit from "../operators/Edit.vue";
import Toast from "./Toast.vue";
import Delete from "../operators/Delete.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();
const current = computed(() => useCurrentNodeStore().current);
</script>

<style scoped lang="postcss">
.operators {
  @apply  btn-ghost btn-sm flex items-center rounded px-2
}
</style>