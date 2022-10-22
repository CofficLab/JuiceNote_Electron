<template>
  <div class="flex flex-row gap-4">
    <span class="my-auto text-red-900">{{ href }}</span>
    <span class="my-auto text-red-900">{{ path }}</span>
    <span class="my-auto text-yellow-900">{{ current.id }}</span>
    <span class="my-auto text-yellow-900">{{ current.title }}</span>
  </div>
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    href: function () {
      return store.href;
    },
    path: function () {
      return decodeURI(store.pathname);
    },
    current: function () {
      return store.current;
    },
  },
});
</script>
