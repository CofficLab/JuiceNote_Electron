<template>
  <div class="flex flex-col items-center gap-4">
    <span class="my-auto text-red-900" v-html="fullPath"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const fullPath = computed(() => useRoute().fullPath);
</script>
