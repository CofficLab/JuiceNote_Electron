<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import "../app.css";
import store from "../models/store";
import { unescape } from "querystring";

export default defineComponent({
  computed: {
    body(): string {
      return markdown.getMarkdownRenderedContentWithoutToc(store.current(unescape(this.$route.path)).id);
    },
  },
  // created: function () {
  //   console.log("content created,current route path is", this.$route.path);
  // },
  mounted: function () {
    if (this.$route.path === "/") {
      console.log("content mounted,current route path is /,redirect to first child");
      this.$router.push(store.current(this.$route.path).link);
    }
  },
});
</script>
