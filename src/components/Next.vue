<template>
  <router-link
    v-bind:to="next.link"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-bind:class="next.isEmpty() ? 'btn-disabled' : ''"
    ><ArrowRightCircle></ArrowRightCircle
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import node from "../models/node";
import { unescape } from "querystring";

export default defineComponent({
  components: {
    ArrowRightCircle,
  },
  computed: {
    next: function (): node {
      // console.log("current node is", store.current(this.$route.path));
      return store.current(unescape(this.$route.path)).next();
    },
  },
});
</script>
