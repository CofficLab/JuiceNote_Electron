<template>
  <div class="copy" @click="exportNode">
    <IconImport v-if="showIcon"></IconImport>
    <span v-if="showText">导入</span>
  </div>
</template>

<script lang="ts" setup>
import IconImport from "../icons/IconImport.vue";
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
  props.node.import()
}
</script>
