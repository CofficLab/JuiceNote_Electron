<template>
  <node-view-wrapper>
    <div class="banner">
      <div class="flex items-center justify-between">
        <Info></Info>
      </div>
      <node-view-content
        class="border border-dashed px-4 dark:border-cyan-800"
        v-bind:class="{ 'border-none': !editable }"
      />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Info from "../assets/icons/info.svg";
import RouteController from "../controllers/RouteController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Info,
  },

  computed: {
    editable: () => RouteController.editMode,
  },

  props: nodeViewProps,
};
</script>
