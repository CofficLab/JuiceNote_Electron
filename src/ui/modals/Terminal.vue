<template>
  <div class="fixed top-12 z-40" v-if="visible">
    <Terminal></Terminal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Terminal from "../components/Terminal.vue";

const visible = ref(false);

window.addEventListener("toggle-terminal", () => (visible.value = !visible.value));
</script>
