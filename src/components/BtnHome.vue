<template>
  <Link
    href="/"
    data-tip="首页"
    v-bind:class="disabled ? 'btn-disabled' : ''"
    class="btn-ghost tooltip tooltip-bottom btn-sm btn my-auto flex items-center"
    ><Home></Home
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../assets/icons/home.svg";
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
