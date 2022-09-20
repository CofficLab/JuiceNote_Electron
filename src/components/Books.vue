<template>
  <div class="dropdown z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <span>{{ activeNavigator.name }}</span>
      <svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow-3xl bg-base-300 dark:bg-info-content w-full rounded-b-3xl h-96 overflow-scroll"
    >
      <li v-for="navigator in navigators">
        <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name" active-class="active">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";
import store from "../models/store";

export default defineComponent({
  data() {
    return {
      navigators: store.navigators,
    };
  },
  methods: {
    getLinkForDir(navigatorName: string) {
      return "/article/" + navigatorName + "@home";
    },
  },
  computed: {
    activeNavigator() {
      return store.sort_mode ? new navigatorNode("正在排序") : nav.getActiveNavigator(this.$route.path);
    },
  },
});
</script>
