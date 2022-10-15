<template>
  <div class="dropdown z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <span>{{ book ? book.title : "" }}</span>
      <chevron-down></chevron-down>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow-3xl bg-base-300 dark:bg-info-content w-full h-96 overflow-scroll"
    >
      <li v-for="book in books">
        <router-link v-bind:to="getLinkForDir(book.id)" v-text="book.id" active-class="active"> </router-link>
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
      books: store.navigators,
    };
  },
  methods: {
    getLinkForDir(navigatorName: string) {
      return "/article/" + navigatorName + "@home";
    },
  },
  computed: {
    book() {
      if (store.sort_mode) {
        let book = new navigatorNode("正在排序");
        book.title = "正在排序";

        return book;
      }

      return nav.getActivatedOnes(this.$route.path).shift();
    },
  },
  components: { ChevronDown },
});
</script>
