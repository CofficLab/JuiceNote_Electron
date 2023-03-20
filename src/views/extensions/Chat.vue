<template>
  <node-view-wrapper>
    <div class="chat" :class="node.attrs.position == 'start' ? 'chat-start' : 'chat-end'">
      <div class="chat-image avatar" contenteditable="false">
        <div class="w-12 rounded-full">
          <img src="/images/logo-Golang.png" @click="switchPosition" />
        </div>
      </div>
      <div class="chat-bubble" :class="node.attrs.position == 'end' ? 'chat-bubble-info' : ''">
        <node-view-content
          class="border border-dashed px-4 dark:border-cyan-800"
          v-bind:class="{ 'border-none': !editable }"
        />
      </div>
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
    editable: () => RouteController.editMode,
  },

  methods: {
    switchPosition() {
      console.log("切换左右");
      this.updateAttributes({
        position: this.node.attrs.position == "start" ? "end" : "start",
      });
    },
  },

  props: nodeViewProps,
};
</script>

<style lang="postcss">
.chat {
  img {
    @apply my-0 !important;
  }
  p {
    @apply my-0 !important;
  }
}
</style>
