<template>
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar"></div>

  <div class="h-12 z-50" v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
    <div class="w-full flex flex-row fixed z-50 shadow-xl">
      <div class="w-56"><Books></Books></div>
      <div class="flex-grow h-12 bg-base-300 flex justify-center shadow-2xl">
        <div class="place-self-center">
          <Chapters></Chapters>
        </div>
      </div>
    </div>
  </div>

  <main class="bg-green-200/20 flex flex-row z-10 min-h-screen overflow-hidden">
    <div class="w-56">
      <div
        class="bg-gradient-to-r from-base-300/30 to-base-200/30 rounded-r-2xl fixed bottom-4 top-14 w-56 py-4 border-l-4 border-slate-500"
      >
        <router-link class="btn w-48 rounded-none" v-bind:to="editorLink" v-html="editorHTML"></router-link>
        <Toc v-show="!inEditorMode"></Toc>
      </div>
    </div>

    <div class="flex-grow">
      <div class="fixed left-60 bottom-4 top-14 right-4 bg-base-200 shadow-2xl rounded-2xl p-0">
        <div class="h-full overflow-scroll scroll-m-48 scroll-p-52">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Actions from "./Actions.vue";
import Books from "./Books.vue";
import markdown from "../models/markdown";
import Chapters from "./Chapters.vue";
import Toc from "./Toc.vue";
import Content from "./Content.vue";
import Editor from "./Editor.vue";
import { nav } from "../models/nav";
import { unescape } from "querystring";

export default defineComponent({
  components: {
    Actions,
    Books,
    Chapters,
    Toc,
    Content,
    Editor,
  },
  mounted: function () {
    console.log("now location is ", location);
    console.log("now route path is ", this.$route.path);
  },
  data() {
    return {
      showEditor: false,
    };
  },
  methods: {
    toggleEditor: function () {
      this.showEditor = !this.showEditor;
    },
  },
  computed: {
    inEditorMode: function () {
      return unescape(this.$route.path).indexOf("editor/") > 0;
    },
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
    editorLink(): string {
      if (unescape(this.$route.path).indexOf("editor/") > 0) {
        return "/article/" + nav.getMarkdownNameFromRoutePath(this.$route.path);
      }

      return "/editor/" + nav.getMarkdownNameFromRoutePath(this.$route.path);
    },
    editorHTML(): string {
      return unescape(this.$route.path).indexOf("editor/") > 0 ? "返回" : "编辑";
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
