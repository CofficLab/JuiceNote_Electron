<template>
  <footer>
    <div class="z-50 flex w-full flex-row items-center gap-12 px-4 shadow">
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
</script>

<style lang="postcss" scope>
footer {
  @apply flex w-full text-info-content;
}
</style>
