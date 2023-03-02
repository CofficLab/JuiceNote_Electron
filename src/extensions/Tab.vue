<template>
  <node-view-wrapper>
    <div class="flex flex-row ring">
      <!-- 拖动的把手 -->
      <div
        class="drag-handle bg-primary-600/40 mr-1 h-10 w-4"
        v-bind:class="{ hidden: !editable }"
        contenteditable="false"
        draggable="true"
        data-drag-handle
      ></div>
      <div class="flex flex-col bg-cyan-900/40 shadow-sm">
        <!-- 标题按钮 -->
        <div class="tabs tabs-boxed rounded-none bg-base-300" contenteditable="false">
          <div v-for="(tab, index) in tabs">
            <a
              class="tab no-underline"
              contenteditable="true"
              v-bind:data-index="index"
              v-bind:class="{ 'tab-active': current == index }"
              @click="activate(index)"
              @keyup="(event) => save(event)"
              >{{ tab }}</a
            >
          </div>
        </div>

        <!-- 内容部分 -->
        <!-- <div contenteditable="true" ref="content" class="p-4" v-on:keyup="save">{{ content }}</div> -->

        <node-view-content class="bg-yellow-300" ref="contents"></node-view-content>
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
      tabs: ["0", "1"],
    };
  },
  computed: {
    editable: () => RouteController.editable,
  },
  methods: {
    activate: function (id) {
      this.current = id;
    },
    save(event) {
      let target = event.target;
      console.log("保存tab名称", target);

      let tabsArray = this.node.attrs.tabs.split(",");
      tabsArray[this.current] = target.innerHTML;
      this.updateAttributes({
        tabs: tabsArray.join(","),
      });

      console.log(this.node.attrs.tabs);
    },
    showContent() {
      console.log("检查要显示的tab content，当前current", this.current);
      let children = this.$refs.contents.$el.children;
      for (let i = 0; i < children.length; i++) {
        let child = children.item(i);
        console.log("检查", child);
        if (i == this.current) {
          console.log("第", i, "个移除hidden");
          if (child.classList.contains("hidden")) child.classList.remove("hidden");
        } else {
          console.log("第", i, "个增加hidden");
          if (!child.classList.contains("hidden")) child.classList.add("hidden");
        }
      }
    },
  },
  watch: {
    current: {
      immediate: true,
      handler: function () {
        this.$nextTick(function () {
          this.showContent();
        });
      },
    },
    editable: {
      immediate: true,
      handler: function () {
        this.$nextTick(function () {
          this.showContent();
        });
      },
    },
  },
  mounted() {
    console.log("tab加载");
    this.tabs = this.node.attrs.tabs.split(",");
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
