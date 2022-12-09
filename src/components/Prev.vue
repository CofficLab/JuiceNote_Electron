<template>
  <Link v-bind:href="prev.id" v-bind:class="prev.isEmpty() ? 'btn-disabled' : ''"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import ArrowLeftCircle from "../icons/arrow-left-circle.vue";
import node from "../models/node";
import Link from "./Link.vue";

export default defineComponent({
  components: {
    ArrowLeftCircle,
    Link,
  },
  computed: {
    prev: function (): node {
      return store.current.prevLeaf();
    },
  },
});
</script>
