<template>
  <node-view-wrapper>
    <node-view-content ref="contents" v-show="this.current == this.node.attrs.index"></node-view-content>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  computed: {
    current: function () {
      console.log("in tab content,check current", this.editor.storage.tab.current);
      return this.editor.storage.tab.current;
    },
  },
  watch: {
    current: function () {
      console.log("tab content said current changede");
    },
  },
  mounted() {
    console.log("tab content加载,tab.storage.current=", this.current);
  },
};
</script>
