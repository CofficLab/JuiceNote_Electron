<template>
  <!-- 用于开发调试的底栏 -->
  <div class="fixed bottom-0 right-0 bg-yellow-500/70 px-4 shadow-2xl">
    <div class="draggable flex-grow">
      <div class="flex flex-col items-center gap-4">
        <span class="my-auto text-red-900" v-html="fullPath"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const fullPath = computed(() => route.fullPath);
</script>
