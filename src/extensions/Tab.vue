<template>
  <node-view-wrapper>
    <div class="flex flex-row ring">
      <div
        class="drag-handle mr-1 h-10 w-4 bg-green-600/40"
        v-bind:class="{ hidden: !editable }"
        contenteditable="false"
        draggable="true"
        data-drag-handle
      />
      <div class="flex flex-col bg-cyan-900/40 shadow-sm">
        <!-- 标题按钮 -->
        <div class="tabs tabs-boxed rounded-none bg-base-300" contenteditable="false">
          <a
            class="tab no-underline"
            v-for="(_, index) in tabs"
            v-bind:class="{ 'tab-active': current == index }"
            @click="activate(index)"
            >TAB {{ index }}</a
          >
        </div>

        <!-- 内容部分 -->
        <div contenteditable="true" ref="content" class="p-4" v-on:keyup="save">{{ content }}</div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import RouteController from "../controllers/RouteController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  data() {
    return {
      current: 0,
      content: "",
      tabs: ["0", "1"],
    };
  },
  computed: {
    editable: () => RouteController.editable,
  },
  methods: {
    activate: function (id) {
      this.current = id;
      this.content = JSON.parse(this.node.attrs.tabs)[this.current];
    },
    save() {
      let tabsArray = JSON.parse(this.node.attrs.tabs);
      tabsArray[this.current] = this.$refs.content.innerHTML;
      this.updateAttributes({
        tabs: JSON.stringify(tabsArray),
      });
    },
  },
  mounted() {
    this.tabs = JSON.parse(this.node.attrs.tabs);
    this.content = this.tabs[this.current];
  },
};
</script>

<style lang="scss">
.drag-handle {
  flex: 0 0 auto;
  position: relative;
  cursor: grab;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
