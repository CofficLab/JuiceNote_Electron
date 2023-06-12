<template>
  <div class="copy" @click="upload">
    <IconShop v-if="showIcon"></IconShop>
    <span v-if="showText">上传到商店</span>
  </div>
</template>

<script lang="ts" setup>
import IconShop from "../icons/IconShop.vue";
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

const upload = () => {
  props.node.sync()
}
</script>
