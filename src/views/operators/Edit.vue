<template>
  <div @click="edit">
    <PencilSquare v-if="!editable"></PencilSquare>
    <ArrowUturnLeft v-if="editable"></ArrowUturnLeft>
    <span v-if="showText">{{ editable ? "退出编辑" : "编辑" }}</span>
  </div>
</template>

<script>
import RightMenuController from "../../controllers/RightMenuController";
import ToastController from "../../controllers/ToastController";
import NodeController from "../../controllers/NodeController";
import PencilSquare from "../../assets/icons/pencil-square.svg";
import ArrowUturnLeft from "../../assets/icons/arrow-uturn-left.svg";

export default {
  props: {
    showText: {
      type: Boolean,
      required: false,
      default: true,
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: { editable: () => NodeController.editable },
  methods: {
    edit() {
      RightMenuController.hide();
      ToastController.set(NodeController.toggleEditable());
    },
  },
  components: { PencilSquare, ArrowUturnLeft },
};
</script>
