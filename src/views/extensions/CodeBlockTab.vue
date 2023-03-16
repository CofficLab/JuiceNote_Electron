<template>
  <node-view-wrapper>
    <div class="flex flex-row overflow-auto">
      <div class="flex w-full flex-col overflow-clip shadow-sm">
        <!-- 标题按钮 -->
        <div class="tabs rounded-none bg-yellow-500/50 p-0" contenteditable="false">
          <div v-for="(title, index) in titles" class="p-0">
            <a
              class="tab rounded-none text-white no-underline"
              contenteditable="true"
              v-bind:data-index="index"
              v-bind:class="{ 'bg-gray-800': current == index }"
              @click="activate(index)"
              @keyup="(event) => save(event)"
              >{{ title }}</a
            >
          </div>
        </div>

        <node-view-content ref="contents" v-bind:data-current="current" class="bg-red-400/40 p-0"></node-view-content>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import NodeController from "../../controllers/NodeController";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  data() {
    return {
      current: this.node.attrs.current,
      titles: this.node.attrs.titles.split(","),
    };
  },
  computed: {
    editable: () => NodeController.getEditable(),
  },
  methods: {
    activate: function (index) {
      this.editor.storage.codeBlockTab.current = index;
      this.current = index;
      this.updateAttributes({
        current: this.current,
      });
    },
    save(event) {
      let target = event.target;
      console.log("保存title名称", target);

      let titles = this.node.attrs.titles.split(",");
      titles[this.current] = target.innerHTML;
      this.updateAttributes({
        titles: titles.join(","),
      });
    },
  },
  mounted() {
    // console.log("tab加载");
    this.activate(this.current);
  },
};
</script>
