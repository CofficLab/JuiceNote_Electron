<template>
  <div v-if="isLesson" class="shadow-3xl fixed bottom-0 flex h-6 w-full items-center justify-between bg-neutral px-4 pl-44 text-neutral-content">
    <div class="flex flex-row items-center gap-12">
      <Breadcrumbs :current="current"></Breadcrumbs>
    </div>
  </div>
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
