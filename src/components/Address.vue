<template>
  <div class="bg-green-500 h-8 fixed bottom-0 w-full">
    <div class="text-sm breadcrumbs justify-center flex">
      <ul>
        <li v-for="item in items">
          {{ item.title }}
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
