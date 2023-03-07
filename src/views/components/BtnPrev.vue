<template>
  <Link
    v-bind:href="prev?.id"
    v-bind:class="!prev ? 'btn-disabled' : ''"
    class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center"
    data-tip="上一页"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import Link from "./Link.vue";
import RouteController from "../../controllers/RouteController";

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
