<template>
  <div @click="edit">{{ editable ? "退出编辑" : "编辑" }}</div>
</template>

<script>
import RightMenuController from "../../controllers/RightMenuController";
import ToastController from "../../controllers/ToastController";
import NodeController from "../../controllers/NodeController";

export default {
  props: ["bookNode"],
  computed: { editable: () => NodeController.editable },
  methods: {
    edit() {
      NodeController.toggleEditable();
      NodeController.setCurrentPage(this.bookNode.id);
      RightMenuController.hide();
      ToastController.set(NodeController.getEditable() ? "已开启编辑模式" : "已关闭编辑模式");
    },
  },
};
</script>
