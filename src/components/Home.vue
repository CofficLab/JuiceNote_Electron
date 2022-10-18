<template>
  <router-link to="/" class="btn my-auto w-full pb-3 rounded-none text-center align-middle"><Home></Home></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";

export default defineComponent({
  components: {
    Home,
  },
});
</script>
