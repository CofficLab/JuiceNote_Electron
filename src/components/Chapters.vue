<template>
  <div class="dropdown w-96">
    <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row justify-between h-full">
      <h1 v-html="title" class="place-self-center my-auto text-xl"></h1>
      <chevron-down></chevron-down>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 mt-0 shadow-2xl bg-base-200 z-50 w-full rounded-b-3xl">
      <li v-for="chapter in chapters">
        <router-link v-bind:to="chapter.link" v-text="chapter.title" active-class="active"> </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav } from "../models/nav";
import store from "../models/store";
import ChevronDown from "../icons/chevron-down.vue";

export default defineComponent({
  computed: {
    chapters() {
      let activatedOnes = nav.getActivatedOnes(this.$route.path);
      let book = activatedOnes.shift();

      return book ? book.children : [];
    },
    title(): string {
      if (store.sort_mode) {
        return "正在排序";
      }

      let activatedOnes = nav.getActivatedOnes(this.$route.path);
      let chapter = activatedOnes.pop();

      return chapter ? chapter.title : "";
    },
  },
  components: { ChevronDown },
});
</script>

<style lang="postcss" scoped></style>
