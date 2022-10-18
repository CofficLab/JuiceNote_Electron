<template>
  <router-link v-bind:to="link" class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    ><ArrowRightCircle></ArrowRightCircle
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";

export default defineComponent({
  components: {
    ArrowRightCircle,
  },
  computed: {
    link: function () {
      let activatedNavigators = store.getActivatedNavigators(this.$route.path);
      let current = activatedNavigators.pop();
      if (current === undefined) return "/";
      let next = current.next();

      // console.log("current is ", current.id);
      // console.log("next is ", next);

      return next === null || next == undefined ? "/" : next.link;
    },
  },
});
</script>
