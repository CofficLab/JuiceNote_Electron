<template>
  <div class="dropdown w-96">
    <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row justify-between h-full">
      <h1 v-html="title" class="place-self-center my-auto text-xl"></h1>
      <chevron-down></chevron-down>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 mt-0 shadow-2xl bg-base-200 z-50 w-full rounded-b-3xl">
      <li v-for="navigator in activeNavigator.children">
        <router-link v-bind:to="getLink(navigator.name)" v-text="navigator.title" active-class="active"> </router-link>
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
      showModal: false,
      form: {
        title: "",
      },
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
      let title = "";
      this.activeNavigator.children.forEach((element) => {
        if (this.shouldBeActive(element)) {
          title = element.title;
        }
      });
      return title;
    },
  },
  components: { ChevronDown },
});
</script>

<style lang="postcss" scoped></style>
