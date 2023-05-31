<template>
  <div class="copy" @click="exportNode">
    <IconExport v-if="showIcon"></IconExport>
    <span v-if="showText">导出「{{node.title}}」</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useNodeStore } from "../stores/NodeStore";
import IconExport from "../icons/IconExport.vue";
import { Node } from "../entities/Node";

const props = defineProps({
  showText: {
    type: Boolean,
    default: true,
    required: false,
  },
  showIcon: {
    type: Boolean,
    default: true,
    required: false,
  },
  node: {
    type: Node,
    required: true,
  }
});

const exportNode = () => {
  props.node.export()
}
</script>
