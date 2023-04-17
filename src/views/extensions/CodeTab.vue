<template>
  <node-view-wrapper class="flex flex-row overflow-auto rounded">
    <div class="flex w-full flex-col overflow-clip shadow-sm">
      <!-- 标题标签 -->
      <div class="tabs flex justify-between rounded-none bg-yellow-500/50 p-0" contenteditable="false" v-if="titles.length > 1 || editable">
        <div class="flex flex-row">
          <div v-for="(title, index) in titles" class="p-0 outline-none">
            <a class="code-title" contenteditable="true" :data-index="index" :class="{ 'bg-gray-800': current == index }" @click="activate(index)" @keyup="(event) => save(event)">{{ title }}</a>
          </div>
        </div>

        <div class="flex">
          <!-- 添加更多标签的按钮 -->
          <button v-if="editable" class="btn-ghost btn-sm btn rounded-none" @click="add">
            <Plus class="w-6 self-center"></Plus>
          </button>

          <!-- 删除的按钮 -->
          <button v-if="editable" class="btn-ghost btn-sm btn flex self-end rounded-none" @click="deleteSelf">
            <Trash class="w-6"></Trash>
          </button>
        </div>
      </div>

      <node-view-content ref="contents" :data-current="current" class="code-editor-container bg-red-400/40 p-0"></node-view-content>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import NodeController from "../../controllers/NodeController";
import Plus from "../../assets/icons/plus.svg";
import Trash from "../../assets/icons/trash.svg";
import { useRoute } from "vue-router";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Plus,
    Trash,
  },
  props: nodeViewProps,
  computed: {
    editable: () => useRoute().name=='lessons.edit',
    current() {
      return this.node.attrs.current;
    },
    titles() {
      return this.node.attrs.titles.split(",");
    },
    currentLanguage() {
      let book = NodeController.getCurrentPage().getBook();
      return book.title.toLowerCase();
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
      let index = this.titles.length;
      this.updateAttributes({
        titles: this.node.attrs.titles + ",新标签",
      });
      let dom = document.createElement("pre");
      dom.setAttribute("index", index);
      dom.innerHTML = "<code language=" + this.currentLanguage + ">新标签的内容</code>";
      this.$refs.contents.$el.append(dom);
      this.updateAttributes({
        current: index,
      });
    },
    deleteSelf() {
      let children = this.$refs.contents.$el.children;

      // 如果只剩一个CodeEditor，删除自己
      if (children.length == 1) {
        return this.deleteNode();
      }

      // 删除当前激活的CodeEditor
      children.item(this.current).remove();

      // 删除刚才删除的CodeEditor对应的title，并更新current为第一个
      let titles = this.node.attrs.titles.split(",");
      titles.splice(this.current, 1);
      this.updateAttributes({
        titles: titles.join(","),
        current: 0,
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

<style lang="postcss" scoped>
.code-title {
  @apply tab rounded-none text-gray-500 no-underline outline-none focus-visible:outline-none dark:text-gray-200;
}
</style>
