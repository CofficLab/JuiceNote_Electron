<template>
  <div class="flex flex-row gap-4">
    <span class="my-auto text-red-900">{{ href }}</span>
    <span class="my-auto text-red-900">{{ path }}</span>
    <span class="my-auto text-yellow-900">{{ current.id }}</span>
  </div>
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    href: function () {
      return window.location.href;
    },
    path: function () {
      return unescape(this.$route.path);
    },
    current: function () {
      return store.current(this.$route.path);
    },
  },
});
</script>
