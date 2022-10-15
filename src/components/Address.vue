<template>
  <div class="bg-green-500 h-8 fixed bottom-0 w-full">
    <div class="text-sm breadcrumbs justify-center flex">
      <ul>
        <li><a>Home</a></li>
        <li><a>Documents</a></li>
        <li>{{ $route.path }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav } from "../models/nav";
import store from "../models/store";

export default defineComponent({
  data() {
    return {
      currentNavigator: nav.getActiveNavigator(this.$route.path),
      items: store.navigators,
    };
  },
  mounted: function () {
    console.log(this.currentNavigator);
  },
});
</script>
