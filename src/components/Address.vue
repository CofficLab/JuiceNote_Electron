<template>
  <div
    class="h-8 fixed bottom-0 w-full p-0 flex justify-center"
    v-bind:class="edit_mode ? 'bg-yellow-300' : 'bg-base-300'"
  >
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
import store from "../models/store";

export default defineComponent({
  computed: {
    edit_mode() {
      return store.edit_mode;
    },
    items() {
      return nav.getActivatedOnes(this.$route.path);
    },
  },
});
</script>
