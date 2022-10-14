<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import "../app.css";
import { escape } from "querystring";

export default defineComponent({
  methods: {
    getContentsWithToc(): string {
      return markdown.getMarkdownRenderedContent(decodeURI(this.path));
    },
    showEditor(): void {
      this.$router.push("/editor/" + this.path);
    },
  },
  computed: {
    path: function () {
      return this.$route.path.replace("/article", "");
    },
    getEditorLink(): string {
      return "/editor/" + this.path;
    },
    body(): string {
      return markdown.getMarkdownRenderedBody(decodeURI(this.path));
    },
  },
});
</script>
