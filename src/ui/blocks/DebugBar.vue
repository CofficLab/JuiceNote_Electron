<template>
  <!-- 用于开发调试的底栏 -->
  <div class="fixed bottom-0 right-0 bg-yellow-500/70 px-4 shadow-2xl">
    <div class="flex flex-row items-center gap-12">
      <span class="my-auto text-red-700" v-html="platform"></span>
      <span class="my-auto text-red-700" v-html="url"></span>
      <span class="my-auto text-red-900" v-html="fullPath"></span>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const electron = require("electron");
const route = useRoute();
const url = computed(() => location.href);
const fullPath = computed(() => route.fullPath);
const platform = electron.ipcRenderer.sendSync("get-platform");
</script>
