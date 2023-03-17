<template>
  <node-view-wrapper class="flex flex-row overflow-auto rounded">
    <div class="flex w-full flex-col overflow-clip shadow-sm">
      <!-- 标题标签 -->
      <div class="tabs rounded-none bg-yellow-500/50 p-0" contenteditable="false">
        <div v-for="(title, index) in titles" class="p-0 outline-none">
          <a
            class="code-title"
            contenteditable="true"
            :data-index="index"
            :class="{ 'bg-gray-800': current == index + 1 }"
            @click="activate(index + 1)"
            @keyup="(event) => save(event)"
            >{{ title }}</a
          >
        </div>
        <!-- 添加更多标签的按钮 -->
        <button v-if="editable" class="btn-ghost btn-sm btn rounded-none" @click="add">
          <Plus class="w-4 self-center"></Plus>
        </button>
      </div>

      <node-view-content ref="contents" v-bind:data-current="current" class="bg-red-400/40 p-0"></node-view-content>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import NodeController from "../../controllers/NodeController";
import Plus from "../../assets/icons/plus.svg";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Plus,
  },
  props: nodeViewProps,
  computed: {
    editable: () => NodeController.getEditable(),
    current() {
      return this.node.attrs.current;
    },
    titles() {
      return this.node.attrs.titles.split(",");
    },
  },
  methods: {
    activate: function (index) {
      this.editor.storage.codeTab.current = index;
      this.updateAttributes({
        current: index,
      });
    },
    add() {
      let index = this.titles.length + 1;
      this.updateAttributes({
        titles: this.node.attrs.titles + "," + index,
      });
      let dom = document.createElement("pre");
      dom.setAttribute("index", index);
      dom.innerHTML = "<code>第" + index + "个标签的内容</code>";
      this.$refs.contents.$el.append(dom);
      this.updateAttributes({
        current: index,
      });
    },
    save(event) {
      let target = event.target;
      console.log("保存title名称", target);

      let titles = this.node.attrs.titles.split(",");
      titles[this.current - 1] = target.innerHTML;
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

<style lang="postcss" scoped>
.code-title {
  @apply tab rounded-none text-gray-500 no-underline outline-none focus-visible:outline-none;
}
</style>
