<template>
  <node-view-wrapper>
    <div
      class="mt-1 mb-6 flex flex-row items-center justify-between rounded border-2 border-black/60 bg-yellow-400 px-4 dark:bg-yellow-600/50"
    >
      <div class="flex flex-row items-center gap-1">
        <InfoIcon></InfoIcon>
        <span>官网</span>
      </div>
      <node-view-content
        class="mx-4 border border-dashed border-cyan-900 p-1 px-4"
        v-bind:class="{ 'border-none': !editable }"
      />
      <a :href="link" target="_blank" class="hover:cursor-pointer"><LinkIcon></LinkIcon></a>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import NodeController from "../../controllers/NodeController";
import LinkIcon from "../../assets/icons/arrow-top-right-on-square.svg";
import InfoIcon from "../../assets/icons/info.svg";

export default {
  components: { NodeViewWrapper, NodeViewContent, LinkIcon, InfoIcon },

  computed: {
    editable: () => NodeController.getEditable(),
    link() {
      return this.node.attrs.link;
    },
  },

  props: nodeViewProps,
};
</script>
