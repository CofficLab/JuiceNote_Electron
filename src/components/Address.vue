<template>
  <div class="text-sm breadcrumbs justify-center flex p-0">
    <ul>
      <li v-for="item in items">
        <router-link v-bind:to="item.link">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav } from "../models/nav";
import store from "../models/store";

export default defineComponent({
  computed: {
    items() {
      return store.navigators.getActivatedChildren(this.$route.path);
    },
  },
});
</script>
