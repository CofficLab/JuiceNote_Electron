<template>
  <div ref="content" class="prose mx-auto container bg-slate-900 text-gray-500" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";

export default defineComponent({
  computed: {
    body(): string {
      return store.code;
    },
  },
});
</script>
