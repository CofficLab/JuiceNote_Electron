<template>
  <node-view-wrapper>
    <div class="relative m-1 rounded-2xl border-2 border-black bg-yellow-400">
      <span class="top-0 bg-sky-600/50 p-1 text-sm" contenteditable="false">提示框</span>
      <node-view-content class="mx-4 mt-2 mb-4 border border-dashed p-1" />
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
