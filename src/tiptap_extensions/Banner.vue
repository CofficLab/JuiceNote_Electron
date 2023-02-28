<template>
  <node-view-wrapper>
    <div class="banner">
      <div class="flex justify-between">
        <Info></Info>
      </div>
      <node-view-content class="border border-dashed px-4 dark:border-cyan-800" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Info from "../assets/icons/info.svg";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,
};
</script>
