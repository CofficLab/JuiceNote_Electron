<template>
  <footer :class="{ 'lg:pl-40': isLesson }">
    <div class="z-50 flex w-full flex-row items-center gap-12 bg-info bg-opacity-30 px-4 shadow backdrop-blur-lg backdrop-filter">
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
const current = computed(() => RouteBox.getCurrentNode(route));
const isLesson = computed(() => RouteBox.isLesson(route));
</script>

<style lang="postcss" scope>
footer {
  @apply fixed bottom-0 z-30 flex h-6 w-full text-info-content;
}
</style>
