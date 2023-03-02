<template>
  <node-view-wrapper ref="content">
    <node-view-content v-show="this.current == this.node.attrs.index"></node-view-content>
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
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    setCurrent: function () {
      this.$nextTick(function () {
        this.current = this.$refs.content.$el.parentElement.getAttribute("data-current");
      });
    },
  },
  mounted: function () {
    this.setCurrent();
    this.editor.on("update", this.setCurrent);
  },
};
</script>
