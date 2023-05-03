<template>
  <footer>
    <Breadcrumbs :current="current"></Breadcrumbs>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";

const current = computed(() => useCurrentNodeStore().current);
</script>
