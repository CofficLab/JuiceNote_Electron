<template>
  <div class="flex flex-row gap-4">
    <span class="my-auto text-red-900">{{ search }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";

export default defineComponent({
  computed: {
    search: () => RouteController.search,
  },
});
</script>
