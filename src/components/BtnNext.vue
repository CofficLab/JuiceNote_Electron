<template>
  <Link
    v-bind:href="next?.id"
    v-bind:class="!next ? 'btn-disabled' : ''"
    class="btn-sm btn btn-ghost tooltip tooltip-bottom flex items-center"
    data-tip="下一页"
  >
    <ArrowRightCircle></ArrowRightCircle>
  </Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    ArrowRightCircle,
    Link,
  },
  computed: {
    next: () => RouteController.getCurrentPage().next(),
  },
});
</script>
