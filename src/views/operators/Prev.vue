<template>
  <Link v-bind:class="!prev ? 'btn-disabled' : ''" data-tip="上一页" :current="current" :id="prev?.id"
    ><ArrowLeftCircle></ArrowLeftCircle>上一页</Link
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import Link from "../components/Link.vue";
import { Node } from "../../models/Node";

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
