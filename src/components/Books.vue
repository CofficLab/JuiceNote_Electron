<template>
  <div class="dropdown z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <span>{{ book ? book.name : "" }}</span>
      <chevron-down></chevron-down>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow-3xl bg-base-300 dark:bg-info-content w-full h-96 overflow-scroll"
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
import ChevronDown from "../icons/chevron-down.vue";

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
    book() {
      return store.sort_mode ? new navigatorNode("正在排序") : nav.getActivatedOnes(this.$route.path).shift();
    },
  },
  components: { ChevronDown },
});
</script>
