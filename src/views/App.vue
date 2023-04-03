<template>
  <div class="flex h-screen w-screen flex-row" v-if="error.length == 0">
    <aside
      v-if="currentId > 0"
      class="hidden h-screen w-40 border-r-2 border-gray-300 bg-base-200 shadow-xl dark:border-cyan-900/10 lg:flex lg:flex-col"
    >
      <SideMenu></SideMenu>
    </aside>

    <div class="flex flex-grow flex-col">
      <TopBar :current="current"></TopBar>
      <div class="flex flex-row overflow-scroll">
        <main class="flex w-full justify-center">
          <router-view></router-view>
        </main>
      </div>
    </div>

    <!-- 弹层 -->
    <Add></Add>
    <Rename></Rename>
  </div>

  <div
    v-if="error.length > 0"
    class="flex h-screen items-center justify-center"
  >
    <h1 v-html="error" class="text-3xl"></h1>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "./blocks/SideMenu.vue";
import TopBar from "./blocks/TopBar.vue";
import Rename from "./modals/Rename.vue";
import Add from "./modals/Add.vue";
import ErrorController from "../controllers/ErrorController";
import NodeController from "../controllers/NodeController";

const error = computed(() => ErrorController.error);

const current = computed(() => NodeController.getCurrentPage());

const currentId = computed(() => useRoute().params.id);
</script>
