<template>
  <Link
    v-bind:id="next?.id"
    v-bind:class="!next ? 'btn-disabled' : ''"
    class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center"
    data-tip="下一页"
    :current="current"
  >
    <ArrowRightCircle></ArrowRightCircle>
  </Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowRightCircle from "../../assets/icons/arrow-right-circle.svg";
import Link from "./Link.vue";
import { Node } from "../../models/Node";

export default defineComponent({
  props: { current: { type: Node, required: true } },
  components: {
    ArrowRightCircle,
    Link,
  },
  computed: {
    next() {
      return this.current.getNextPage();
    },
  },
});
</script>
