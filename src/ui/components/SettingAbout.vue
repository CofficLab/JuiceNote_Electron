<template>
    <div class="flex flex-col gap-4">
        <div class="flex-row m-auto rounded-2xl bg-white/20 gap-4  justify-center items-center flex">
            <img src="/logo.png" class="h-24 w-24 p-0 border-r border-white/30">
            <h1 class="text-font-bold text-3xl" v-html="name"></h1>
            <h1 class="text-font-bold pr-4 text-3xl">{{ latestVersion }}</h1>
            <button @click="openFolder" class="btn mr-4"><IconDownload></IconDownload></button>
        </div>

        <div class="flex-row m-auto rounded-2xl bg-white/20 gap-4  justify-center items-center flex">
            <img src="/logo.png" class="h-16 w-16 p-0 border-r border-white/30">
            <h1 class="text-font-bold text-3xl" v-html="name"></h1>
            <h1 class="text-font-bold pr-4 text-3xl">{{ version }}</h1>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Preload from "../api/Preload";
import { useOtherStore } from "../stores/OtherStore";
import IconDownload from '../icons/IconDownload.vue'
import { computed } from "vue";

const name = Preload.getAppName()
const version = Preload.getAppVersion();
const latestVersion = computed(()=> useOtherStore().latestVersion);

const openFolder = () => {
    Preload.openUserDataPath().then((folders) => {
        if (folders.canceled) return;
    })
}
</script>