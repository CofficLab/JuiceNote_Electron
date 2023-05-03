<template>
  <div @click="toggleVisible">
    <HideIcon v-if="showIcon"></HideIcon>
    <span v-if="showText">隐藏或显示</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useToastStore } from "../stores/ToastStore";
import HideIcon from "../icons/IconNo.vue";
import { useRoute, useRouter } from "vue-router";
import { Node } from "../entities/Node";
import { useCurrentNodeStore } from "../stores/NodeStore";

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

const target = computed(() => props.node ?? useCurrentNodeStore().current);

const toggleVisible = function () {
  useToastStore().set(target.updateVisible());
};
</script>
