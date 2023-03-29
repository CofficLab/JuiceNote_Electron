<template>
  <div @click="toggleVisible">
    <HideIcon v-if="showIcon"></HideIcon>
    <span v-if="showText">隐藏或显示</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToastController from "../../controllers/ToastController";
import Trash from "../../assets/icons/trash.svg";
import HideIcon from "../../assets/icons/no-symbol.svg"
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";
export default defineComponent({
  props: {
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
  },
  computed: {
    target() {
      return this.node ?? NodeController.getCurrentPage();
    },
  },
  methods: {
    toggleVisible() {
      ToastController.set(NodeController.updateVisible(this.target));
    },
  },
  components: { HideIcon },
});
</script>
