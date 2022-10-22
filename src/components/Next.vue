<template>
  <Link v-bind:href="next.link" class="btn my-auto w-full pb-3 rounded-none text-center align-middle">
    <ArrowRightCircle></ArrowRightCircle>
  </Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import node from "../models/node";
import Link from "./Link.vue";

export default defineComponent({
  components: {
    ArrowRightCircle,
    Link,
  },
  computed: {
    next: function (): node {
      let current = store.current;
      return current.notLeaf() ? current.firstLeaf().nextLeaf() : current.nextLeaf();
    },
  },
});
</script>
