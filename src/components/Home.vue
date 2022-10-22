<template>
  <Link
    v-bind:href="link"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-bind:class="disabled ? 'btn-disabled' : ''"
    ><Home></Home
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";
import Link from "./Link.vue";
import store from "../models/store";

export default defineComponent({
  components: {
    Home,
    Link,
  },
  computed: {
    link(): string {
      return store.root.link;
    },
    disabled(): boolean {
      return store.current.isRoot() || store.current === store.root.first();
    },
  },
});
</script>
