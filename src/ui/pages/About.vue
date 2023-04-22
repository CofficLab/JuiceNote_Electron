<template>
  <div class="flex flex-row w-screen h-screen justify-center items-center text-center">
    <h1>版本 <span v-html="version"></span></h1>
  </div>
</template>

<script setup>
// const electron = require("electron");
const version = electron.ipcRenderer.sendSync("get-app-version");
</script>
