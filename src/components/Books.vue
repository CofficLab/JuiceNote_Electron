<template>
  <div class="dropdown dropdown-hover z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <span>{{ book.title }}</span>
      <!-- <chevron-down></chevron-down> -->
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow-2xl bg-base-300 border border-primary dark:bg-info-content w-full h-96 overflow-scroll"
    >
      <li v-for="book in books" class="flex justify-center">
        <router-link v-bind:to="book.link" v-text="book.id" active-class="active" class="flex justify-center">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ChevronDown from "../icons/chevron-down.vue";

export default defineComponent({
  data() {
    return {
      books: store.navigators.children,
    };
  },
  computed: {
    book() {
      return store.navigators.getActivatedChild(this.$route.path);
    },
  },
  components: { ChevronDown },
});
</script>
