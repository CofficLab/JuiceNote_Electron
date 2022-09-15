<template>
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar"></div>

  <div class="h-12 z-50" v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
    <div class="w-full flex flex-row fixed bg-red-100 z-50">
      <Books></Books>
      <div class="flex-grow h-12 bg-base-300 flex justify-center shadow-2xl">
        <div class="place-self-center">
          <Chapters></Chapters>
        </div>
      </div>
    </div>
  </div>

  <main class="bg-red-700/10 flex justify-between z-10">
    <div class="w-56 z-10" v-html="toc"></div>
    <div class="bg-blue-500/40 w-full flex flex-grow mx-auto">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Actions from "./Actions.vue";
import Books from "./Books.vue";
import markdown from "../models/markdown";
import Chapters from "./Chapters.vue";

export default defineComponent({
  components: {
    Actions,
    Books,
    Chapters,
  },
  computed: {
    hideTitleBar: function () {
      return this.$store.state.full_screen;
    },
    path: function () {
      return this.$route.path.replace("/article", "");
    },
    toc(): string {
      return markdown.getMarkdownToc(this.path);
    },
    title(): string {
      return markdown.getMarkdownTitle(this.path);
    },
  },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-none mx-auto prose z-10;
  ul {
    @apply list-none pl-1 fixed z-10;

    a {
      @apply no-underline z-0;
    }
  }
}
</style>
