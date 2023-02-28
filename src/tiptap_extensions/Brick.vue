<template>
  <node-view-wrapper>
    <div class="brick">
      <node-view-content class="border border-dashed dark:border-cyan-800" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,
};
</script>
