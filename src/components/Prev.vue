<template>
  <Link v-bind:href="prev?.id" v-bind:class="!prev ? 'btn-disabled' : ''" class="btn-sm btn rounded-none"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../entities/Store";
import ArrowLeftCircle from "../icons/arrow-left-circle.vue";
import node from "../entities/TreeNode";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    ArrowLeftCircle,
    Link,
  },
  computed: {
    prev: function () {
      return RouteController.getCurrentPage().prev();
    },
  },
});
</script>
