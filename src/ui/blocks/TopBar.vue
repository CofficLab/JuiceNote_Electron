<template>
  <!-- 顶栏 -->
  <div class="flex h-full justify-between" :class="{ 'mr-40': isWindows }">
    <div class="ml-40 flex items-center lg:ml-2">
      <Breadcrumbs :current="current" v-if="currentId > 0"></Breadcrumbs>
    </div>
    <div class="draggable flex-grow"></div>
    <div class="flex h-8 flex-row items-center justify-end gap-4 pr-4">
      <!-- <Languages></Languages> -->
      <BtnOfficialLink></BtnOfficialLink>
      <Terminal :class="'btn-ghost btn-xs btn rounded-sm px-1'"></Terminal>
      <Prev class="btn-ghost btn-xs btn rounded-sm px-1" :showText="false" v-if="isRouteLesson"></Prev>
      <Home class="btn-ghost btn-xs btn rounded-sm px-1"></Home>
      <Next class="btn-ghost btn-xs btn rounded-sm px-1" :showText="false" v-if="isRouteLesson"></Next>
      <More class="btn-ghost btn-xs btn rounded-sm px-1"></More>
    </div>
  </div>
</template>

<script setup>
import { Node } from "../models/Node";
import Home from "../operators/Home.vue";
import More from "../operators/More.vue";
import Next from "../operators/Next.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Prev from "../operators/Prev.vue";
import Terminal from "../operators/Terminal.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const electron = require("electron");
const route = useRoute();
const currentId = computed(() => route.params.id);
const current = computed(() => Node.find(currentId.value));
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
const isWindows = electron.ipcRenderer.sendSync("get-platform") == "win32";
</script>
