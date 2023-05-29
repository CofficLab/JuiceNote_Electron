<template>
  <div class="flex h-screen w-screen flex-col gap-4 items-center justify-center text-center">
    <div class="flex flex-row gap-1 w-full max-w-2xl">
      <input type="text" v-model="databasePath" class="text-input w-full max-w-2xl" />
      <button class="btn" @click="x">选择</button>
    </div>
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
