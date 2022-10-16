<template>
  <div class="bg-base-300 h-8 fixed bottom-0 w-full p-0 flex justify-center">
    <div class="text-sm breadcrumbs justify-center flex p-0">
      <ul>
        <li v-for="item in items">
          <router-link v-bind:to="item.link">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav } from "../models/nav";

export default defineComponent({
  computed: {
    items() {
      return nav.getActivatedOnes(this.$route.path);
    },
  },
});
</script>
