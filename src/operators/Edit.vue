<template>
  <div @click="edit">{{ editable ? "退出编辑" : "编辑" }}</div>
</template>

<script>
import RouteController from "../controllers/RouteController";
import RightMenuController from "../controllers/RightMenuController";
import ToastController from "../controllers/ToastController";

export default {
  props: ["bookNode"],
  computed: { editable: () => RouteController.editable },
  methods: {
    edit() {
      RouteController.toggleEditMode();
      RouteController.goto(this.bookNode.id);
      RightMenuController.hide();
      ToastController.set(this.editable ? "已开启编辑模式" : "已关闭编辑模式");
    },
  },
};
</script>
