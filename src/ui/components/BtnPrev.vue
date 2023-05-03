<template>
  <Link v-bind:class="!prev ? 'btn-disabled' : ''" class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center" data-tip="上一页" :node="current" :id="prev?.id"
    ><ArrowLeftCircle></ArrowLeftCircle
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../icons/arrow-left-circle.svg";
import Link from "./Link.vue";

export default defineComponent({
  props: { current: { type: Node, required: true } },
  components: {
    ArrowLeftCircle,
    Link,
  },
  computed: {
    prev() {
      return this.current.getPreviousPage();
    },
  },
});
</script>
