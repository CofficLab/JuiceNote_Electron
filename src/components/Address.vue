<template>
  <div class="flex flex-row gap-4">
    <span class="my-auto text-red-900">{{ linkId }}</span>
    <span class="my-auto text-red-900">{{ search }}</span>
    <span class="my-auto text-yellow-900">{{ current.id }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    linkId: function () {
      return store.current.linkId();
    },
    search: function () {
      return store.search;
    },
    current: function () {
      return store.current;
    },
  },
});
</script>
