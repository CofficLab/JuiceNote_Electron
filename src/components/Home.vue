<template>
  <Link href="/" v-bind:class="disabled ? 'btn-disabled' : ''" class="btn-sm btn btn-ghost rounded-none"
    ><Home></Home
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    Home,
    Link,
  },
  computed: {
    disabled: () => RouteController.isHomePage,
  },
});
</script>
