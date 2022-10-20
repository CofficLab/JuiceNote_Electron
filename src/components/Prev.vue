<template>
  <router-link
    v-bind:to="prev.link"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-bind:class="prev.isEmpty() ? 'btn-disabled' : ''"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowLeftCircle from "../icons/arrow-left-circle.vue";
import node from "../models/node";

export default defineComponent({
  components: {
    ArrowLeftCircle,
  },
  computed: {
    prev: function (): node {
      // console.log("go to prev said:current node is", store.current(this.$route.path));
      return store.current(this.$route.path).prev();
    },
  },
});
</script>
