<template>
  <footer v-if="isLesson">
    <div class="flex px-4 w-full bg-info bg-opacity-30 flex-row items-center gap-12 shadow backdrop-blur-lg backdrop-filter">
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
  @apply fixed bottom-0 flex h-6 w-full lg:pl-40 text-info-content;
}
</style>
