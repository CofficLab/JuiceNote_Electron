<template>
  <div class="fixed bottom-0 left-40 w-full bg-yellow-500/70 px-4 shadow-2xl dark:bg-blue-500">
    <div class="flex flex-row items-center gap-12">
      <span class="my-auto text-red-700" v-html="url"></span>
      <span class="my-auto text-red-900" v-html="fullPath"></span>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const url = computed(() => location.href);
const fullPath = computed(() => route.fullPath);
</script>
