<template>
  <div @click="toggleVisible">
      <HideIcon v-if="showIcon"></HideIcon>
      <span v-if="showText">隐藏或显示</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ToastController from "../../controllers/ToastController";
import HideIcon from "../../assets/icons/no-symbol.svg";
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";
import { useRoute, useRouter } from "vue-router";

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
    required: false,
  },
});

const router = useRouter();
const route = useRoute();

const target = computed(() => props.node ?? Node.find(route.params.id));

const toggleVisible = function () {
  ToastController.set(NodeController.updateVisible(target.value));
};
</script>
