<template>
  <router-link
    v-bind:to="link"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-bind:class="disabled ? 'btn-disabled' : ''"
    ><Home></Home
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";
import store from "../models/store";

export default defineComponent({
  components: {
    Home,
  },
  computed: {
    link(): string {
      return store.root.link;
    },
    disabled(): boolean {
      return store.current(this.$route.path).isRoot() || store.current(this.$route.path) === store.root.first();
    },
  },
});
</script>
