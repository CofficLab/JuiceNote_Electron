<template>
  <div>
    <ul class="menu bg-base-100">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.title }}</Link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    menus() {
      let parent = store.current.parent();

      return parent.children;
    },
  },
  components: { Link },
});
</script>
