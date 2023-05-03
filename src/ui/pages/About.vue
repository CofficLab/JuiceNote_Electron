<template>
  <div class="flex h-screen w-screen flex-row items-center justify-center text-center">
    <h1>版本 <span v-html="version"></span></h1>
  </div>
</template>

<script lang="ts" setup>
import Preload from "../api/Preload";

const version = Preload.getAppVersion();
</script>
