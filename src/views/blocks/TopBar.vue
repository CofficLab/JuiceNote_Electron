<template>
  <!-- 顶栏 -->
  <div id="top-bar" class="draggable">
    <div class="ml-20 flex w-full items-center lg:ml-2">
      <Breadcrumbs :current="current"></Breadcrumbs>
    </div>
    <div class="flex h-12 w-full flex-row items-center justify-end pr-4">
      <!-- <Languages></Languages> -->
      <BtnOfficialLink></BtnOfficialLink>
      <BtnTerminal></BtnTerminal>
      <Toast></Toast>
      <BtnPrev :current="current"></BtnPrev>
      <Home :current="current"></Home>
      <Next
        class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center"
        :current="current"
        :showText="false"
      ></Next>
      <BtnMore></BtnMore>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Node } from "../../models/Node";
import Home from "../operators/Home.vue";
import BtnMore from "../components/BtnMore.vue";
import Next from "../operators/Next.vue";
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import BtnPrev from "../components/BtnPrev.vue";
import BtnTerminal from "../components/BtnTerminal.vue";
import Languages from "../components/Languages.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import Toast from "./Toast.vue";

export default defineComponent({
  components: { Breadcrumbs, Languages, BtnOfficialLink, BtnTerminal, Toast, BtnPrev, Home, Next, BtnMore },
  props: { current: { type: Node, required: true } },
});
</script>

<style scoped lang="postcss">
#top-bar {
  @apply z-50 flex h-12 w-full justify-between border-b border-gray-300 bg-base-200 shadow dark:border-cyan-900/10;
}
</style>
