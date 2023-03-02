<template>
  <node-view-wrapper>
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
      <div contenteditable="true" ref="content" v-on:keyup="save">{{ content }}</div>
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
