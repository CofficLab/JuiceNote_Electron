<template>
  <node-view-wrapper>
    <div class="flex flex-col bg-cyan-900/40 shadow-sm">
      <div class="tabs tabs-boxed rounded-none bg-base-300">
        <a class="tab no-underline" v-bind:class="{ 'tab-active': current == 1 }" @click="activate(1)">Tab 1</a>
        <a class="tab no-underline" v-bind:class="{ 'tab-active': current == 2 }" @click="activate(2)">Tab 2</a>
        <a class="tab no-underline" v-bind:class="{ 'tab-active': current == 3 }" @click="activate(3)">Tab 3</a>
      </div>

      <div v-bind:class="{ hidden: current != 1 }">
        <label contenteditable="false" class="ml-4">Tab1的内容</label>
        <node-view-content
          class="border border-dashed px-4 dark:border-cyan-800"
          v-bind:class="{ 'border-none': !editable }"
          v-model="tab1Content"
        />
      </div>

      <div v-bind:class="{ hidden: current != 2 }">
        <label contenteditable="false" class="ml-4">Tab2的内容</label>
        <node-view-content
          class="border border-dashed p-4 dark:border-cyan-800"
          v-bind:class="{ 'border-none': !editable }"
        />
      </div>

      <div v-bind:class="{ hidden: current != 3 }">
        <label contenteditable="false" class="ml-4">Tab3的内容</label>
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
      current: 1,
      tab1Content: "",
    };
  },
  computed: {
    editable: () => RouteController.editable,
  },
  methods: {
    activate: function (id) {
      this.current = id;
    },
  },
};
</script>
