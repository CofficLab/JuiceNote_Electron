<template>
  <div @click="goPrev">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">上一页</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../icons/arrow-left-circle.svg";

export default defineComponent({
  components: { ArrowLeftCircle },
  props: {
    showIcon: { type: Boolean, default: true },
    showText: { type: Boolean, default: true },
  },
  methods: {
    goPrev() {
      NodeController.setCurrentPage(NodeController.getCurrentPage().getPreviousPage().id);
    },
  },
});
</script>
