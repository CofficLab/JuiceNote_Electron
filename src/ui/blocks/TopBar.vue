<template>
  <!-- 顶栏 -->
  <div class="flex h-full justify-between" :class="{ 'mr-40': isWindows }">
    <div class="draggable flex-grow"></div>
    <div class="flex flex-row items-center justify-end gap-2 pr-4">
      <!-- <Languages></Languages> -->
      <BtnOfficialLink></BtnOfficialLink>
      <Terminal class="btn-ghost btn-sm flex items-center rounded px-2"></Terminal>
      <Prev class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isRouteLesson"></Prev>
      <Home class="btn-ghost btn-sm flex items-center rounded px-2"></Home>
      <Next class="btn-ghost btn-sm flex items-center rounded px-2" :showText="false" v-if="isRouteLesson"></Next>
      <Themes></Themes>
      <More class="btn-ghost btn-sm flex items-center rounded px-2"></More>
    </div>
  </div>
</template>

<script setup>
import Home from "../operators/Home.vue";
import More from "../operators/More.vue";
import Next from "../operators/Next.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Prev from "../operators/Prev.vue";
import Terminal from "../operators/Terminal.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Node from "../entities/Node";
import Preload from "../entities/Preload";
import Themes from "../operators/Themes.vue";

// const electron = require("electron");
const route = useRoute();
const currentId = computed(() => route.params.id);
const current = computed(() => Node.find(currentId.value));
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
const isWindows = Preload.IpcRender.sendSync("get-platform") == "win32";
</script>
