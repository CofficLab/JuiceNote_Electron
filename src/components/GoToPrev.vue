<template>
  <router-link v-bind:to="prevLink" class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowLeftCircle from "../icons/arrow-left-circle.vue";

export default defineComponent({
  components: {
    ArrowLeftCircle,
  },
  computed: {
    prevLink: function () {
      let current = store.getCurrent(this.$route.path);
      let prev = current.prev();

      return prev === null || prev == undefined ? "/" : prev.link;
    },
  },
});
</script>
