<template>
  <node-view-wrapper>
    <div class="mt-4 h-0 -translate-x-96 border-2 border-b-rose-200 text-xl">
      <node-view-content
        class="border border-dashed px-4 dark:border-cyan-800"
        v-bind:class="{ 'border-none': !editable }"
      />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Info from "../../assets/icons/info.svg";
import RouteController from "../../controllers/RouteController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Info,
  },

  mounted() {
    console.log("加载time line title node view");
  },

  computed: {
    editable: () => RouteController.editMode,
  },

  props: nodeViewProps,
};
</script>
