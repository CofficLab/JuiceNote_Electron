<template>
  <footer>
    <Breadcrumbs :current="current"></Breadcrumbs>
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
