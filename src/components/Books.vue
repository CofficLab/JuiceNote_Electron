<template>
  <div class="dropdown bg-green-400 z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <span>{{ activeNavigator.name }}</span>
      <svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow-3xl bg-base-300 dark:bg-info-content w-full rounded-b-3xl h-96 overflow-scroll z-50"
    >
      <li v-for="navigator in navigators">
        <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name" class="" active-class="active">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";

export default defineComponent({
  data() {
    return {
      expand: false,
    };
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
    },
    shouldBeActive(navigator: navigatorNode) {
      return navigator.name == unescape(this.$route.path).replace("/article/", "");
    },
    getLinkForDir(navigatorName: string) {
      return "/article/" + navigatorName + "@home";
    },
    getLink(navigatorName: string) {
      return "/article/" + navigatorName;
    },
    getText(navigator: navigatorNode): string {
      let splitted = navigator.name.split("@");
      let text = splitted.pop();

      if (text === "home") {
        return "首页";
      }

      return text === undefined ? "" : text;
    },
  },
  computed: {
    navigators() {
      // console.log('navigators are: ' + nav.getNavigators())
      return nav.getNavigators();
    },
    activeNavigator() {
      return nav.getActiveNavigator(this.$route.path);
    },
  },
});
</script>
