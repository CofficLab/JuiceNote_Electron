<template>
  <node-view-wrapper>
    <div class="mt-1 mb-2 flex flex-col rounded border-2 border-black bg-yellow-400 dark:bg-yellow-600/50">
      <div class="flex justify-between pl-4">
        <div>
          <div class="alert alert-info rounded-none py-0">
            <div>
              <Info></Info>
              <span>官网</span>
            </div>
          </div>
        </div>
      </div>
      <node-view-content
        class="mx-4 mt-2 mb-4 border border-dashed border-cyan-900 p-1"
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

  computed: {
    editable: () => RouteController.editable,
  },

  props: nodeViewProps,
};
</script>
