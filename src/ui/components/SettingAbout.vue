<template>
    <div class="flex-col m-auto rounded-2xl bg-white/20 w-72 h-72 justify-center items-center flex">
        <img src="/logo.png" class="h-44 w-44 p-0">
        <h1 class="text-font-bold text-3xl" v-html="name"></h1>
        <h1 class="text-font-bold">版本 {{ version }}</h1>
    </div>
</template>

<script lang="ts" setup>
import Preload from "../api/Preload";

const name = Preload.getAppName()
const version = Preload.getAppVersion();
</script>