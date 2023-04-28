<template>
  <footer v-if="isLesson">
    <div class="flex flex-row items-center gap-12">
      <Breadcrumbs :current="current"></Breadcrumbs>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import RouteBox from "../entities/RouteBox";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const current = computed(() => RouteBox.getCurrentNode(route));
</script>

<style lang="postcss" scope>
footer {
  @apply fixed bottom-0 flex h-6 w-full items-center justify-between bg-info bg-opacity-30 px-4 pl-44 text-info-content shadow backdrop-blur-lg backdrop-filter;
}
</style>
