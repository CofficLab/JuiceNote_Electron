<template>
  <div class="flex h-screen w-screen flex-col gap-4 items-center justify-center text-center">
    <div class="stats shadow">

      <div class="stat">
        <div class="stat-title">版本</div>
        <div class="stat-value text-primary">{{ version }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="stat-title">Page Views</div>
        <div class="stat-value text-secondary">2.6M</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
    </div>
    <input type="text" v-model="databasePath" class="file-input w-full max-w-xs" />
    <button class="btn" @click="x">选择</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Preload from "../api/Preload";
import componentLogger from "../log/componentLogger";

const version = Preload.getAppVersion();
const config = ref({databasePath: ""});
const databasePath = computed(() => config.value.databasePath);

onMounted(() => {
  Preload.getConfig().then((c) => {
    componentLogger.info("「setting」从主进程获取用户配置", c,typeof c);
    config.value = c
  })
});

const x = () => {
  Preload.openFolderDialog().then((folders) => {
    let folder = folders.filePaths[0];
    config.value.databasePath = folder
    Preload.setConfig(JSON.stringify(config.value,null,2)).then(() => {
      componentLogger.info("「setting」保存用户配置", config.value);
    })
  })
}
</script>
