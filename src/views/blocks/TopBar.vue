<template>
  <!-- 顶栏 -->
  <div id="top-bar">
    <div class="ml-40 flex items-center lg:ml-2">
      <Breadcrumbs :current="current" v-if="currentId > 0"></Breadcrumbs>
    </div>
    <div class="draggable flex-grow"></div>
    <div class="flex h-10 flex-row items-center justify-end pr-4">
      <Toast></Toast>
      <!-- <Languages></Languages> -->
      <BtnOfficialLink></BtnOfficialLink>
      <BtnTerminal></BtnTerminal>
      <Prev class="btn-ghost btn-sm btn" :showText="false" v-if="isRouteLesson"></Prev>
      <Home class="btn-ghost btn-sm btn"></Home>
      <Next class="btn-ghost btn-sm btn" :showText="false" v-if="isRouteLesson"></Next>
      <BtnMore></BtnMore>
    </div>
  </div>
</template>

<script setup>
import { Node } from "../../models/Node";
import Home from "../operators/Home.vue";
import BtnMore from "../components/BtnMore.vue";
import Next from "../operators/Next.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Prev from "../operators/Prev.vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import Toast from "./Toast.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const currentId = computed(() => route.params.id);
const current = computed(() => Node.find(currentId.value));
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
</script>

<style scoped lang="postcss">
#top-bar {
  @apply flex justify-between;
}
</style>
