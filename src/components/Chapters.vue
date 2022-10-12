<template>
  <div class="dropdown w-96">
    <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row justify-between h-full">
      <h1 v-html="title" class="place-self-center my-auto text-xl"></h1>
      <svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 mt-0 shadow-2xl bg-base-200 z-50 w-full rounded-b-3xl">
      <li v-for="navigator in activeNavigator.children">
        <router-link v-bind:to="getLink(navigator.name)" v-text="navigator.name" active-class="active"> </router-link>
      </li>
      <hr class="mb-4" />
      <li>
        <router-link to="/" active-class="active">增加章节</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";
import markdown from "../models/markdown";
import store from "../models/store";

export default defineComponent({
  data() {
    return {
      navigators: store.navigators,
    };
  },
  methods: {
    shouldBeActive(navigator: navigatorNode) {
      return nav.shouldBeActive(navigator, this.$route.path);
    },
    getLink(navigatorName: string) {
      return "/article/" + navigatorName;
    },
  },
  computed: {
    activeNavigator() {
      return nav.getActiveNavigator(this.$route.path);
    },
    title(): string {
      if (store.sort_mode) {
        return "正在排序";
      }

      return markdown.getMarkdownTitle(nav.getMarkdownNameFromRoutePath(this.$route.path));
    },
  },
});
</script>

<style lang="postcss" scoped></style>
