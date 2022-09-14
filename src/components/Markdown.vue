<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import "../app.css";

export default defineComponent({
  props: ["path"],
  methods: {
    getContentsWithToc(): string {
      return markdown.getMarkdownRenderedContent(this.path);
    },
    showEditor(): void {
      this.$router.push("/editor/" + this.path);
    },
  },
  computed: {
    getEditorLink(): string {
      return "/editor/" + this.path;
    },
    body(): string {
      return markdown.getMarkdownRenderedBody(this.path);
    },
  },
});
</script>
