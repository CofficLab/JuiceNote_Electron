<template>
  <div class="prose mx-auto min-h-screen pb-96 container" v-html="body" v-if="!isDir"></div>

  <div class="flex justify-center">
    <ul class="menu bg-base-100 w-56 rounded-box my-auto flex" v-if="isDir">
      <li v-for="child in current.children">
        <router-link v-bind:to="child.link">{{ child.title }}</router-link>
      </li>
    </ul>
  </div>
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
    isDir(): boolean {
      return store.current(unescape(this.$route.path)).children.length > 0;
    },
    href(): string {
      return window.location.href;
    },
    routePath(): string {
      return this.$route.path;
    },
    current(): node {
      return store.current(unescape(this.$route.path));
    },
    body(): string {
      return markdown.getMarkdownRenderedContentWithoutToc(store.current(unescape(this.$route.path)).id);
    },
  },
});
</script>
