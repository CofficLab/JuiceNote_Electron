<template>
  <div @click="deleteBookNode">
    <Trash v-if="showIcon"></Trash>
    <span v-if="showText">删除</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToastController from "../../controllers/ToastController";
import Trash from "../../assets/icons/trash.svg";
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
    deleteBookNode() {
      ToastController.set(NodeController.delete(this.target));
    },
  },
  components: { Trash },
});
</script>
