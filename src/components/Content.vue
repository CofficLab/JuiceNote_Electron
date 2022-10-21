<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";
export default defineComponent({
  computed: {
    body(): string {
      return store.current(this.$route.path).html();
    },
  },
});
</script>
