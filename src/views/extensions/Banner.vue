<template>
  <node-view-wrapper>
    <div class="my-4 gap-2 rounded-xl bg-gradient-to-r from-cyan-800/50 p-3 ring-1">
      <div class="flex items-center justify-between">
        <Info></Info>
      </div>
      <node-view-content class="border border-dashed px-4 dark:border-cyan-800" v-bind:class="{ 'border-none': !editable }" />
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { useRoute } from "vue-router";
import Info from "../../assets/icons/info.svg";

const route = useRoute();
const editable = route.query.editable;
const props = defineProps(nodeViewProps);
</script>
