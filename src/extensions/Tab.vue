<template>
  <node-view-wrapper>
    <div class="flex flex-col bg-cyan-900/40 shadow-sm">
      <!-- 标题按钮 -->
      <div class="tabs tabs-boxed rounded-none bg-base-300">
        <a
          class="tab no-underline"
          v-for="(tab, index) in tabs"
          v-bind:class="{ 'tab-active': current == index }"
          @click="activate(index)"
          >TAB {{ index }}</a
        >
      </div>

      <!-- 内容部分 -->
      <div v-for="(tab, index) in tabs" v-bind:class="{ hidden: index != current }">
        <div>{{ tab }}</div>
        <node-view-content
          class="border border-dashed px-4 dark:border-cyan-800"
          v-bind:class="{ 'border-none': !editable }"
        />
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
    };
  },
  computed: {
    editable: () => RouteController.editable,
    tabs() {
      let tabs = JSON.parse(this.node.attrs.tabs);
      return tabs;
    },
  },
  watch: {
    tab1Content: () => {
      console.log("tab1content changed");
    },
  },
  methods: {
    activate: function (id) {
      this.current = id;
    },
    setContent() {
      console.log("set content");
      this.updateAttributes({
        content: this.node.attrs.content,
      });
    },
    handleUpdate() {
      console.log("tab handle update,tab1content is", this.$refs.tab1content);
    },
  },
  mounted() {
    console.log("mounted props is", this);
    this.editor.on("update", this.handleUpdate);
    this.$nextTick(this.handleUpdate);
  },
};
</script>
