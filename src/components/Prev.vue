<template>
  <Link
    v-bind:href="prev?.id"
    v-bind:class="!prev ? 'btn-disabled' : ''"
    class="btn-sm btn btn-ghost tooltip tooltip-bottom flex items-center"
    data-tip="上一页"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../icons/arrow-left-circle.vue";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    ArrowLeftCircle,
    Link,
  },
  computed: {
    prev: () => RouteController.getCurrentPage().prev(),
  },
});
</script>
