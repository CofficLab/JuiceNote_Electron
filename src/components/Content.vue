<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import "../app.css";
import store from "../models/store";
import { unescape } from "querystring";
import node from "../models/node";

export default defineComponent({
  computed: {
    body(): string {
      let current = store.current(unescape(this.$route.path));
      return markdown.getMarkdownRenderedContentWithoutToc(current.firstLeaf().id);
    },
  },
});
</script>
