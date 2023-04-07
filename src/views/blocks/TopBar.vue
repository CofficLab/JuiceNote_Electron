<template>
  <!-- 顶栏 -->
  <div id="top-bar">
    <div class="ml-20 flex items-center lg:ml-2">
      <Breadcrumbs :current="current" v-if="currentId > 0"></Breadcrumbs>
    </div>
    <div class="draggable flex-grow">
      <Address></Address>
    </div>
    <div class="flex h-12 flex-row items-center justify-end pr-4">
      <!-- <Languages></Languages> -->
      <BtnOfficialLink></BtnOfficialLink>
      <BtnTerminal></BtnTerminal>
      <Toast></Toast>
      <Prev class="btn-ghost btn-sm btn" :showText="false"></Prev>
      <Home class="btn-ghost btn-sm btn"></Home>
      <Next class="btn-ghost btn-sm btn" :showText="false"></Next>
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
import Address from "../components/Address.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const currentId = computed(() => useRoute().params.id);
const current = computed(() => Node.find(currentId.value));
</script>

<style scoped lang="postcss">
#top-bar {
  @apply flex justify-between border-b border-gray-300 bg-base-200 shadow dark:border-cyan-900/10;
}
</style>
