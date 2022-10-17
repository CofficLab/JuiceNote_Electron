<template>
  <div class="flex flex-row justify-between">
    <div class="w-96">
      <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row h-full">
        <h1 v-html="title" class="my-auto text-xl"></h1>
      </label>
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row h-full">
        <chevron-down></chevron-down>
      </label>
      <ul tabindex="0" class="dropdown-content w-96 menu p-2 mt-0 max-h-96 shadow-2xl bg-base-200 z-50 overflow-scroll">
        <li v-for="chapter in chapters">
          <router-link v-bind:to="chapter.link" v-text="chapter.title" active-class="active"> </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChevronDown from "../icons/chevron-down.vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    chapters() {
      let activatedOnes = store.navigators.getActivatedChildren(this.$route.path);
      let book = activatedOnes.shift();

      return book ? book.children : [];
    },
    title(): string {
      let activatedOnes = store.navigators.getActivatedChildren(this.$route.path);
      let chapter = activatedOnes.pop();

      return chapter ? chapter.title : "";
    },
  },
  components: { ChevronDown },
});
</script>

<style lang="postcss" scoped></style>
