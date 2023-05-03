<template>
  <div @click="next">
    <ArrowRightCircle v-if="showIcon"></ArrowRightCircle>
    <span v-if="showText">下一页</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowRightCircle from "../icons/arrow-right-circle.svg";
import Link from "../components/Link.vue";

export default defineComponent({
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  components: {
    ArrowRightCircle,
    Link,
  },
  methods: {
    next() {
      NodeController.setCurrentPage(NodeController.getCurrentPage().getNextPage().id);
    },
  },
});
</script>
