<template>
  <div>
    <div class="flex flex-col gap-4 justify-center h-screen items-center p-12">
      <h2 class="card-title">找不到对应的页面</h2>
      <p v-html="fullPath"></p>

      <a href="/" class="btn w-24">首页</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const fullPath = computed(() => {
  return route.fullPath;
});
</script>
