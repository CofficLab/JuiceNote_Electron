<template>
  <Link v-bind:href="next?.id" v-bind:class="!next ? 'btn-disabled' : ''" class="btn-sm btn rounded-none">
    <ArrowRightCircle></ArrowRightCircle>
  </Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../entities/Store";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import node from "../entities/TreeNode";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    ArrowRightCircle,
    Link,
  },
  computed: {
    next: function (): node {
      return RouteController.getCurrentPage().next();
    },
  },
});
</script>
