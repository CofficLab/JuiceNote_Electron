<template>
  <div @click="toggleVisible">
    <HideIcon v-if="showIcon"></HideIcon>
    <span v-if="showText">隐藏或显示</span>
  </div>
</template>

<script lang="ts" setup>
import { useToastStore } from "../stores/ToastStore";
import HideIcon from "../icons/IconNo.vue";
import { Node } from "../entities/Node";
import componentLogger from "../log/componentLogger";

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
  },
});

const toggleVisible = function () {
  componentLogger.info(`${props.node.title} 当前可见性为 ${props.node.isVisible}`);
  props.node.updateVisible(!props.node.isVisible).then(() => {
    useToastStore().set('可见性更新成功')
  })
};
</script>
